const qrcode = require('qrcode-terminal');
const fs = require('fs');
const cron = require('node-cron');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');

const SESSION_FILE_PATH = './session.json';
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    authStrategy: new LegacySessionAuth({
        session: sessionData
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    client.getChats().then(chats => {
        const contact = chats.find(chat =>
            chat.name = "Rimpi"
        )
        cron.schedule('* * * * *', () => {
            client.sendMessage(contact.id._serialized, "This is an automated msg!").then(res => {
                console.log("Message was sent successfully");
            }).catch(err => {
                console.log("The error is: ", err);
            });
        })
    })
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if(err) console.log(err);
    })
})

client.initialize();