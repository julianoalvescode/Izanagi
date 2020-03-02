
const MessagingResponse = require('twilio').twiml.MessagingResponse
const Session = require('./../models/Session')

const izanagiUtils = require('./../utils/utils')

module.exports = {

  async serverON (req, res) {
    res.send('<h1>Servidor Rodando</h1>')
  },

  async sendMessage (req, res) {
    const response = new MessagingResponse()
    const message = response.message()
    // const responseUser = req.body.Body
    // const number = req.body.From
    const { From, Body } = req.body
    const numberUser = await Session.findOne({ number_user: From })
    const responseIzanagi = await izanagiUtils.getTalkIzanagi(Body,
      numberUser ? numberUser.session_id : await izanagiUtils.createIDSession(From)
    )

    // const responseIzanagi = 'Testando'

    message.body(responseIzanagi)

    res.writeHead(200, {
      'Content-Type': 'text/xml'
    })

    res.end(response.toString())
  }

}
