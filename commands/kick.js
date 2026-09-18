const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick user dari server',
  async execute(message, args, client, db) {
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return message.reply('❌ Kamu tidak memiliki permission untuk kick user.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('❌ Mention user yang ingin di-kick: `!kick @user [reason]`');
    }

    const member = await message.guild.members.fetch(user.id).catch(() => null);
    if (!member) {
      return message.reply('❌ User tidak ditemukan di server.');
    }

    const reason = args.slice(1).join(' ') || 'Tidak ada alasan';

    try {
      await member.kick(reason);
      message.reply(`👢 ${user.tag} di-kick dari server.\n📝 Alasan: ${reason}`);
    } catch (error) {
      console.error(error);
      message.reply('❌ Tidak bisa kick user. Periksa permission bot.');
    }
  },
};
