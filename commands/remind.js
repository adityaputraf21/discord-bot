const natural = require('natural');

function parseReminderDate(input) {
  // Format: "YYYY-MM-DD HH:mm" atau natural language
  const isoRegex = /(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/;
  const match = input.match(isoRegex);

  if (match) {
    const date = new Date(`${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:00Z`);
    return date;
  }

  // Natural language parsing
  const now = new Date();
  const lower = input.toLowerCase();

  if (lower.includes('besok')) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const hourMatch = input.match(/(\d+)\s*(pagi|siang|sore|malam|am|pm)?/i);
    if (hourMatch) {
      let hour = parseInt(hourMatch[1]);
      const period = hourMatch[2]?.toLowerCase();

      if (period === 'sore') hour += 12;
      if (period === 'malam') hour += 18;
      if (period === 'pm') hour = hour === 12 ? 12 : hour + 12;

      tomorrow.setHours(hour, 0, 0, 0);
      return tomorrow;
    }
    return tomorrow;
  }

  return null;
}

module.exports = {
  name: 'remind',
  description: 'Set reminder untuk acara di tanggal tertentu',
  async execute(message, args, db) {
    if (args.length < 2) {
      return message.reply(
        '❌ Gunakan: `!remind <tanggal> <pesan>`\nFormat: `2026-09-20 14:30` atau `besok jam 3 siang`'
      );
    }

    const dateInput = args[0];
    const reminderText = args.slice(1).join(' ');

    const reminderDate = parseReminderDate(dateInput);

    if (!reminderDate || reminderDate < new Date()) {
      return message.reply(
        '❌ Tanggal tidak valid atau sudah lewat. Format: `YYYY-MM-DD HH:mm` atau `besok jam 3 siang`'
      );
    }

    db.run(
      `INSERT INTO reminders (user_id, guild_id, channel_id, reminder_text, reminder_date)
       VALUES (?, ?, ?, ?, ?)`,
      [
        message.author.id,
        message.guildId,
        message.channelId,
        reminderText,
        reminderDate.toISOString(),
      ],
      function (err) {
        if (err) {
          console.error(err);
          return message.reply('❌ Error saat membuat reminder.');
        }
        message.reply(
          `✅ Reminder dibuat!\n📌 ${reminderText}\n🕐 ${reminderDate.toLocaleString('id-ID')}`
        );
      }
    );
  },
};
