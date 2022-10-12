const { Client,  LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');
exports.whatsappFunc = async (req, res, next) => {
    console.log(req.body);
    const payload = req.body.payload;
    const time = req.body.time;

    // Use the saved values
    const client = new Client();
    // const client = new Client({
    //     authStrategy: new LocalAuth()
    // });

    client.on('qr', (qr, err) => {
        if(err){
            console.log("Error in qr -> ",err);
        }
        // qrcode.generate(qr, {small: true});
        console.log(qr);
        res.status(200).json({
            success: true,
            qr: qr
        });
    });

    client.on('ready', async () => {
        console.log('Client is ready!');
        const number = payload.number;
        const sanitized_number = number.toString().replace(/[- )(]/g, "");
        const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`;

        const number_data = await client.getNumberId(final_number);
        console.log("number_details: ", number_data);

        const date = new Date(time.year, time.month, time.day, time.hour, time.min, 0);
        console.log(date);

        const job = schedule.scheduleJob(date, async () => {
            if (number_data) {
                const sendMessageData = await client.sendMessage(number_data._serialized, payload.msg);
                console.log(sendMessageData);
            } else {
                console.log(final_number, "Mobile number is not registered");
            }
        });
    });

    // Save session values to the file upon successful auth
    // client.on('authenticated', (session) => {
    //     // sessionData = session;
    //     // console.log(session)
    //     // fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    //     //     if (err) {
    //     //         console.error(err);
    //     //     }
    //     // });
    // });


    client.initialize();
}