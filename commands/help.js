module.exports = {
  name: 'help',
  description: 'Tampilkan daftar command',
  async execute(message, args, client, db) {
    const embed = {
      color: 0x0099ff,
      title: '📖 Daftar Command Bot',
      description: 'Gunakan `!help [command]` untuk detail',
      fields: [
        {
          name: '🎯 General',
          value: '`ping` - Cek status bot\n`help` - Tampilkan command',
          inline: false,
        },
        {
          name: '⏰ Reminder',
          value: '`remind <tanggal> <pesan>` - Set reminder\nFormat: `YYYY-MM-DD HH:mm` atau `besok jam 3 siang`',
          inline: false,
        },
        {
          name: '⚖️ Moderation',
          value: '`warn <user> [reason]` - Berikan warning\n`kick <user> [reason]` - Kick user\n`ban <user> [reason]` - Ban user\n`mute <user> [duration]` - Mute user\n`clear <jumlah>` - Hapus pesan',
          inline: false,
        },
      ],
      footer: {
        text: `Prefix: !`,
      },
    };
    message.reply({ embeds: [embed] });
  },
};
