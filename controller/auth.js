// const client = require('./client');
const qrcode = require('qrcode-terminal');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const fs = require('fs');

exports.postLogin = (res, req, next) => {
    const SESSION_FILE_PATH = '../session.json';
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
        console.log("Cliend is ready");
        
    });

    client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if(err) console.log(err);
        })
    })

    client.initialize();
}