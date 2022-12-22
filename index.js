const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');

    //Kirim pesan ke nomor tertentu
    client.sendMessage('6285709917613@c.us', 'Hello from whatsapp-web.js!');
    console.log('Pesan berhasil terkirim');
});