// Server functions

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

// twilio auth
const accountSID = 'AC9bb9ed50d07e59893a50f78532ec89a3';
const token = '83ae88028bb9dc2aee4a638d4fb6b58a';
const client = new  twilio(accountSID, token);

const app = express();

// remove browser restrictions 
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.get('/send-text', (req,res) => {

    const {recipient, textmessage} = req.query

    client.messages.create({
        body: textmessage,
        to: "+1" + recipient,
        from : '+12286410929'
    }).then((message) => console.log(message.body));
})

app.listen(4000, ()=> console.log("Running on 4000"));