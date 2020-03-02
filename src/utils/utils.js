const assistant = require('./../service/api-watson')
const client = require('./../service/api-twilio')

module.exports = {
  async sendMessage (body, to) {
    return new Promise((resolve, reject) => {
      client.messages
        .create({
          mediaUrl: ['https://avatars2.githubusercontent.com/u/43914533?s=460&v=4'],
          from: 'whatsapp:+14155238886',
          body: `Este é você ${body}`,
          to: `whatsapp:${to}`
        })
        .then(message => resolve(console.log(message.sid)))
    })
  },

  async createIDSession () {
    return new Promise((resolve, reject) => {
      assistant.createSession({
        assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719'
      })
        .then(res => {
          const ID = res.result.session_id
          console.log(res.result.session_id)

          resolve(ID)
        })
    })
  },

  async getTalkIzanagi (textTalk) {
    return new Promise((resolve, reject) => {
      assistant.message({
        assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719',
        sessionId: this.createIDSession(),
        input: {
          message_type: 'text',
          text: textTalk
        }
      })
        .then(res => {
          console.log(res.result.output.generic[0].text)

          const textResponse = `${res.result.output.generic[0].text}`

          resolve(textResponse)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}
