const MessagingResponse = require('twilio').twiml.MessagingResponse

const izanagiUtils = require('./../utils/utils')

module.exports = {

  async serverON (req, res) {
    res.send('<h1>Servidor Rodando</h1>')
  },

  async sendMessage (req, res) {
    const response = new MessagingResponse()
    const message = response.message()
    const responseUser = req.Body.body
    const responseIzanagi = await izanagiUtils.getTalkIzanagi(responseUser)

    message.body(responseIzanagi)

    res.writeHead(200, {
      'Content-Type': 'text/xml'
    })

    res.end(response.toString())
  }

}
