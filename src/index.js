const express = require('express');
const app = express()
const assistant = require('./service/api-watson')
const client = require('./service/api-twilio')
const axios = require('axios').default;


const text = 'Ainda bebe, rôbo do Juliano'

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});

app.get('/', (req, res) => {
  // client.messages
  // .create({
  //    mediaUrl: ['https://avatars2.githubusercontent.com/u/43914533?s=460&v=4'],
  //    from: 'whatsapp:+14155238886',
  //    body: `Este é você`,
  //    to: 'whatsapp:+5521969023070'
  //  })
  // .then(message => console.log(message.sid));
      res.send('<h1>Testando Tudo</h1>')
})

