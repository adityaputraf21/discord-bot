module.exports = {
  name: 'ping',
  description: 'Cek latency bot',
  async execute(message, args, client, db) {
    const msg = await message.reply('🏓 Pong?');
    const latency = msg.createdTimestamp - message.createdTimestamp;
    msg.edit(`🏓 Pong! Latency: ${latency}ms | Websocket: ${client.ws.ping}ms`);
  },
};
