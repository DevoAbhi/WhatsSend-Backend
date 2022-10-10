const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
// const cors = require('cors');

const app = express();
// app.use(cors());

//route
const whatsappRoute = require("./routes/whatsapp");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, X-AUTH-TOKEN");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH,PUT, DELETE,OPTIONS");

    next();
});

app.use(whatsappRoute);

module.exports = app;