const express = require('express');
const app = express()

// Dotenv
require('dotenv').config()

// IBM 
const assistant = require('./service/api-watson')

const axios = require('axios').default;

// Twilio
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const client = require('./service/api-twilio')
const twilio = require('twilio')

// Body Parser
const bodyParser = require('body-parser');


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});

// Body-parser Config

app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

async function sendMessage(body, to) {

  return new Promise((resolve, reject) => {

    client.messages
    .create({
       mediaUrl: ['https://avatars2.githubusercontent.com/u/43914533?s=460&v=4'],
       from: 'whatsapp:+14155238886',
       body: `Este é você ${body}`,
       to: `whatsapp:${to}`
     })
    .then(message => resolve(console.log(message.sid)));

  })

}

async function createIDSession() {
  return new Promise((resolve, reject) => {

    assistant.createSession({
      assistantId: process.env.ASSISTANT_ID
    })
    .then(res => {
      const ID = res.result.session_id;
      console.log(res.result.session_id)

      resolve(ID)

    }) 

  })

}

async function getTalkIzanagi(textTalk, id) {

  return new Promise((resolve, reject) => {

  
        assistant.message({
          assistantId: process.env.ASSISTANT_ID,
          sessionId: id,
          input: {
            'message_type': 'text',
            'text': textTalk
          }
        })
        .then(res => {
          console.log(res.result.output.generic[0].text);

          const textResponse = `${res.result.output.generic[0].text}`

          resolve(textResponse)

        })
        .catch(err => {
          console.log(err);
        });

  })


}

app.get('/', async (req, res) => {

  // if(localStorage.getItem('IBM_SESSION') === false){

  //   localStoragse.setItem('IBM_SESSION', await createIDSession())

  // } else {
  //   return false;
  // }

  res.send(console.log('Servidor Rodando'))

})


app.post('/sms', async (req, res) => {

    // if(localStorage.getItem('IBM_SESSION') === false){

    //   localStorage.setItem('IBM_SESSION', await createIDSession())

    // } else {
    //   return false;
    // }


    const response = new MessagingResponse();
    const message = response.message();
    const responseUser = req.body.Body;
    const respostaIzanagi = await getTalkIzanagi(responseUser, await createIDSession());
  

    // if(responseUser == '157') {
    //   message.body(`${req.body.Body} isso é um artigo penal`)
    // } else {
    //   message.body(`Você disse: ${req.body.Body}`)
    // }

    message.body(`${respostaIzanagi}`)
  

    res.writeHead(200, {
      'Content-Type':'text/xml'
    });

    res.end(response.toString())

})

