# Discord Bot Lengkap - Reminder Edition

Bot Discord dengan fitur moderation, reminder, dan command management.

## Fitur

✅ **General**
- `ping` - Cek status bot
- `help` - Tampilkan daftar command

✅ **Reminder**
- `remind <tanggal> <pesan>` - Set reminder untuk acara tertentu
  - Format: `!remind 2026-09-20 14:30 Rapat tim`
  - Natural language: `!remind besok jam 3 siang Meeting`
- `reminders` - Lihat semua reminder kamu

✅ **Moderation**
- `warn <user> [reason]` - Berikan warning (auto-alert di 3 warning)
- `kick <user> [reason]` - Kick user dari server
- `ban <user> [reason]` - Ban user dari server  
- `mute <user> [duration]` - Mute user (contoh: `!mute @user 10m`)
- `clear <jumlah>` - Hapus pesan (1-100)

## Setup

### 1. Persiapan
```bash
# Clone/extract folder ke device
cd discord-bot

# Install dependencies
npm install
```

### 2. Dapatkan Discord Bot Token
1. Buka https://discord.com/developers/applications
2. Klik "New Application"
3. Beri nama bot
4. Ke tab "Bot" → "Add Bot"
5. Copy token ke `.env`

### 3. Setup Permission Discord Server
1. Di Developer Portal → Bot → OAuth2 → URL Generator
2. Pilih scopes: `bot`
3. Pilih permissions:
   - General: Manage Guild, Kick Members, Ban Members
   - Text: Send Messages, Manage Messages, Embed Links, Read Message History
   - Voice: Mute Members, Deafen Members
4. Copy generated URL → buka di browser → authorize ke server

### 4. Setup .env File
Buka `.env` dan update:
```
DISCORD_TOKEN=your_token_here
PREFIX=!
NODE_ENV=development
```

### 5. Jalankan Bot
```bash
npm start
```

Bot bakal nongol online di server!

## Command Contoh

**Set reminder:**
```
!remind 2026-09-25 19:00 Ultah Doni
!remind besok jam 9 pagi Morning standup
```

**Moderation:**
```
!warn @user spam
!mute @user 30m
!kick @user@user Violate rules
!ban @user Toxic behavior
!clear 10
```

**Lihat info:**
```
!help
!ping
!reminders
```

## Struktur Project

```
discord-bot/
├── index.js          # Main bot file
├── db.js             # Database setup (SQLite)
├── .env              # Config (jangan push!)
├── .gitignore
├── package.json
└── commands/
    ├── help.js
    ├── ping.js
    ├── remind.js
    ├── reminders.js
    ├── warn.js
    ├── kick.js
    ├── ban.js
    ├── mute.js
    └── clear.js
```

## Database

SQLite otomatis create 2 table:
- `reminders` - Simpan reminder dengan tanggal
- `warnings` - Track warning user

## Troubleshoot

**Bot offline:**
- Cek token di `.env` valid
- Periksa internet connection

**Command tidak jalan:**
- Pastikan prefix benar (default `!`)
- Cek permission bot di server

**Reminder tidak trigger:**
- Bot harus tetap online
- Cek tanggal reminder format benar

## Deploy

Untuk production, use:
- PM2 (process manager)
- Heroku / Railway / VPS
- Docker container

Contoh PM2:
```bash
npm install -g pm2
pm2 start index.js --name "discord-bot"
pm2 save
```

---

**Bot siap dipakai!** Tinggal set token & jalankan. 🚀
