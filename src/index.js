const express = require('express');
const app = express()

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

app.get('/', (req, res) => {

  // client.messages
  // .create({
  //    mediaUrl: ['https://avatars2.githubusercontent.com/u/43914533?s=460&v=4'],
  //    from: 'whatsapp:+14155238886',
  //    body: `Este é você`,
  //    to: 'whatsapp:+5521969023070'
  //  })
  // .then(message => console.log(message.sid));
  

  assistant.createSession({
    assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719'
  })
    .then(res => {

      assistant.message({
        assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719',
        sessionId: res.result.session_id,
        input: {
          'message_type': 'text',
          'text': 'hello'
        }
      })
      .then(res => {
        console.log(res.result.output.generic[0].text);
      })
      .catch(err => {
        console.log(err);
      });

    })
    .catch(err => {
      console.log(err);
    });

  

  res.send(console.log('Texto aqui'))

})


app.post('/sms', (req, res) => {

    const response = new MessagingResponse();
    const message = response.message();
    const responseUser = req.body.Body;
    

    if(responseUser == '157') {
      message.body(`${req.body.Body} isso é um artigo penal`)
    } else {
      message.body(`Você disse: ${req.body.Body}`)
    }


    res.writeHead(200, {
      'Content-Type':'text/xml'
    });

    res.end(response.toString())

})

