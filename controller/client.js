
const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const fs = require('fs');


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


module.exports = client;