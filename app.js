require('dotenv').config();
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');

const { Client, LegacySessionAuth } = require('whatsapp-web.js');
//m3BB18y7VhnwwXNg


const MongoDb_URI = "mongodb+srv://abhinab:" + process.env.DB_PASSWORD + "@cluster0.zr7ai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-AUTH-TOKEN");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE,OPTIONS");

    next();
});


// const SESSION_FILE_PATH = './session.json';
// let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

// const client = new Client({
//     authStrategy: new LegacySessionAuth({
//         session: sessionData
//     })
// });

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

// client.on('ready', () => {
//     console.log('Client is ready!');

//     client.getChats().then(chats => {
//         const contact = chats.find(chat =>
//             chat.name = "Rimpi"
//         )
//         cron.schedule('* * * * *', () => {
//             client.sendMessage(contact.id._serialized, "This is an automated msg!").then(res => {
//                 console.log("Message was sent successfully");
//             }).catch(err => {
//                 console.log("The error is: ", err);
//             });
//         })
//     })
// });

// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if(err) console.log(err);
//     })
// })

// client.initialize();


app.use(authRoute);
mongoose.connect(MongoDb_URI,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(result => {
    console.log("Database has been connected successfully!")

  })
  .catch(err => {
    console.log("Could not connect to the Database!")
    console.log(err)
  })

module.exports = app;