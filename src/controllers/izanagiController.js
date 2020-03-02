
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
    // const numberUser = await Session.findOne({ number_user: number })
    // const responseIzanagi = await izanagiUtils.getTalkIzanagi(responseUser,
    //   numberUser ? numberUser.session_id : await izanagiUtils.createIDSession(number)
    // )

    const responseIzanagi = 'Testando'

    message.body(responseIzanagi)

    res.writeHead(200, {
      'Content-Type': 'text/xml'
    })

    res.end(response.toString())
  }

}
