const { Client,  LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');

// Use the saved values
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
        const receiver = chats.find(
            (chat) => chat.name === "Rimpi"
        );

        const date = new Date(2022, 7, 28, 2, 3, 0);

        const job = schedule.scheduleJob(date, () => {
            client.sendMessage(
                receiver.id._serialized,
                "Hello, This is a 5 sec scheduled msg!"
            );
          });

    });
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    // sessionData = session;
    // console.log(session)
    // fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    // });
});


client.initialize();