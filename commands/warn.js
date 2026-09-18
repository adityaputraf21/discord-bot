const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Berikan warning ke user',
  async execute(message, args, client, db) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.reply('❌ Kamu tidak memiliki permission untuk warn user.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('❌ Mention user yang ingin di-warn: `!warn @user [reason]`');
    }

    const reason = args.slice(1).join(' ') || 'Tidak ada alasan';

    db.run(
      `INSERT INTO warnings (user_id, guild_id, reason, moderator_id)
       VALUES (?, ?, ?, ?)`,
      [user.id, message.guildId, reason, message.author.id],
      function (err) {
        if (err) {
          console.error(err);
          return message.reply('❌ Error saat membuat warning.');
        }

        db.get(
          `SELECT COUNT(*) as count FROM warnings WHERE user_id = ? AND guild_id = ?`,
          [user.id, message.guildId],
          (err, row) => {
            const warnCount = row.count;
            message.reply(
              `⚠️ ${user.tag} di-warn oleh ${message.author.tag}\n📝 Alasan: ${reason}\n🔢 Total warning: ${warnCount}`
            );

            if (warnCount >= 3) {
              message.reply(`⛔ ${user.tag} sudah mencapai 3 warning. Pertimbangkan untuk kick/ban.`);
            }
          }
        );
      }
    );
  },
};
