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

async function getTalkIzanagi(textTalk) {

  return new Promise((resolve, reject) => {

    assistant.createSession({
      assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719'
    })
      .then(res => {
  
        assistant.message({
          assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719',
          sessionId: res.result.session_id,
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
      .catch(err => {
        console.log(err);
      });

      

  })


}

app.get('/', (req, res) => {

  res.send(console.log('Servidor Rodando'))

  

})


app.post('/sms', (req, res) => {

    const response = new MessagingResponse();
    const message = response.message();
    const responseUser = req.body.Body;
    const respostaIzanagi = getTalkIzanagi('Olá');

    // if(responseUser == '157') {
    //   message.body(`${req.body.Body} isso é um artigo penal`)
    // } else {
    //   message.body(`Você disse: ${req.body.Body}`)
    // }

    message.body(`Testando: ${respostaIzanagi}`)

    res.writeHead(200, {
      'Content-Type':'text/xml'
    });

    res.end(response.toString())

})

