require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const cron = require('node-cron');
const db = require('./db');
const path = require('path');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

const PREFIX = process.env.PREFIX || '!';
const commands = {};

// Load commands
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands[command.name] = command;
  }
}

client.once('ready', () => {
  console.log(`✓ Bot online sebagai ${client.user.tag}`);

  // Cek reminder setiap menit
  cron.schedule('* * * * *', async () => {
    checkReminders();
  });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!commands[commandName]) {
    return message.reply('Command tidak ditemukan. Gunakan `!help` untuk daftar command.');
  }

  try {
    await commands[commandName].execute(message, args, client, db);
  } catch (error) {
    console.error(error);
    message.reply('Error saat menjalankan command.');
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const commandName = interaction.commandName;
  if (!commands[commandName]) return;

  try {
    await commands[commandName].executeSlash(interaction, client, db);
  } catch (error) {
    console.error(error);
    interaction.reply({ content: 'Error saat menjalankan command.', ephemeral: true });
  }
});

async function checkReminders() {
  const now = new Date();
  const currentTime = now.toISOString();

  db.all(
    `SELECT * FROM reminders WHERE is_sent = 0 AND reminder_date <= ?`,
    [currentTime],
    async (err, reminders) => {
      if (err) {
        console.error('Database error:', err);
        return;
      }

      for (const reminder of reminders) {
        try {
          const channel = await client.channels.fetch(reminder.channel_id);
          const user = await client.users.fetch(reminder.user_id);

          if (channel) {
            await channel.send(
              `<@${reminder.user_id}> Reminder: ${reminder.reminder_text}`
            );
          }

          db.run(`UPDATE reminders SET is_sent = 1 WHERE id = ?`, [reminder.id]);
        } catch (error) {
          console.error('Error sending reminder:', error);
        }
      }
    }
  );
}

client.login(process.env.DISCORD_TOKEN);
