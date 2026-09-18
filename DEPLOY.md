## Deploy ke Render (24/7 Gratis)

### Step 1: Push ke GitHub
```bash
cd discord-bot
git init
git add .
git commit -m "Initial discord bot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/discord-bot.git
git push -u origin main
```

### Step 2: Buka Render
1. Buka https://render.com
2. Sign up dengan GitHub
3. Klik "New +" → "Web Service"
4. Pilih repository "discord-bot"
5. Nama: `discord-bot`
6. Runtime: Node
7. Build command: `npm install`
8. Start command: `npm start`

### Step 3: Setup Environment Variables
Di Render dashboard → Environment:
```
DISCORD_TOKEN = your_token_here
PREFIX = !
NODE_ENV = production
```

### Step 4: Deploy
Klik "Deploy". Tunggu ~2 menit sampai hijau "Live".

Bot auto-run 24/7 gratis!

### Catatan Penting

**SQLite Database:**
- Render punya ephemeral storage (file hilang saat redeploy)
- Reminder data akan reset setiap deployment
- Solusi: upgrade ke Paid tier ($7/bulan) untuk persistent storage

**Alternatif Database (gratis):**
1. **Pakai Render PostgreSQL** (gratis tier, 90 hari inactive delete)
2. **Pakai MongoDB Atlas** (gratis cloud database, keep data)
3. **Keep SQLite** (terima data ephemeral)

### Troubleshoot

**Bot offline mulu:**
- Cek logs di Render dashboard
- Verify DISCORD_TOKEN benar

**Reminder tidak jalan:**
- Render auto-sleep free tier idle 15 menit
- Upgrade ke paid atau gunakan cron service external

**Auto-restart:**
Render auto-restart jika bot crash. Sudah tercover.

---

**TL;DR:** Push to GitHub → Render connect → set token → live! 🚀
