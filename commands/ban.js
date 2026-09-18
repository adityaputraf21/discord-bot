const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban user dari server',
  async execute(message, args, client, db) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return message.reply('❌ Kamu tidak memiliki permission untuk ban user.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('❌ Mention user yang ingin di-ban: `!ban @user [reason]`');
    }

    const reason = args.slice(1).join(' ') || 'Tidak ada alasan';

    try {
      await message.guild.members.ban(user, { reason });
      message.reply(`⛔ ${user.tag} di-ban dari server.\n📝 Alasan: ${reason}`);
    } catch (error) {
      console.error(error);
      message.reply('❌ Tidak bisa ban user. Periksa permission bot.');
    }
  },
};
