module.exports = {
  name: 'reminders',
  description: 'Lihat daftar reminder kamu',
  async execute(message, args, client, db) {
    db.all(
      `SELECT * FROM reminders WHERE user_id = ? ORDER BY reminder_date ASC`,
      [message.author.id],
      (err, rows) => {
        if (err) {
          console.error(err);
          return message.reply('❌ Error saat mengambil reminder.');
        }

        if (!rows || rows.length === 0) {
          return message.reply('❌ Kamu tidak punya reminder.');
        }

        let text = '📋 **Reminder Kamu:**\n\n';
        rows.forEach((reminder, index) => {
          const date = new Date(reminder.reminder_date).toLocaleString('id-ID');
          const status = reminder.is_sent ? '✅' : '⏳';
          text += `${index + 1}. ${status} **${reminder.reminder_text}**\n   🕐 ${date}\n\n`;
        });

        message.reply(text);
      }
    );
  },
};
