const { PermissionFlagsBits } = require('discord.js');

function parseDuration(input) {
  const regex = /(\d+)([smhd])/i;
  const match = input.match(regex);
  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * multipliers[unit];
}

module.exports = {
  name: 'mute',
  description: 'Mute user di voice/text channel',
  async execute(message, args, client, db) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.reply('❌ Kamu tidak memiliki permission untuk mute user.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('❌ Mention user yang ingin di-mute: `!mute @user [duration]`\nDuration: `10s`, `5m`, `1h`, `1d`');
    }

    const member = await message.guild.members.fetch(user.id).catch(() => null);
    if (!member) {
      return message.reply('❌ User tidak ditemukan di server.');
    }

    const duration = parseDuration(args[1]) || 10 * 60 * 1000; // Default 10 menit

    try {
      await member.timeout(duration);
      message.reply(`🔇 ${user.tag} di-mute selama ${args[1] || '10m'}.`);
    } catch (error) {
      console.error(error);
      message.reply('❌ Tidak bisa mute user. Periksa permission bot.');
    }
  },
};
