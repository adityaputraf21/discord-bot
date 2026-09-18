const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Hapus pesan di channel',
  async execute(message, args, client, db) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return message.reply('❌ Kamu tidak memiliki permission untuk menghapus pesan.');
    }

    const amount = parseInt(args[0]);

    if (!amount || amount < 1 || amount > 100) {
      return message.reply('❌ Gunakan: `!clear <jumlah>` (1-100)');
    }

    try {
      const messages = await message.channel.bulkDelete(amount + 1, true);
      const reply = await message.reply(`✅ Menghapus ${messages.size - 1} pesan.`);
      setTimeout(() => reply.delete(), 3000);
    } catch (error) {
      console.error(error);
      message.reply('❌ Error saat menghapus pesan.');
    }
  },
};
