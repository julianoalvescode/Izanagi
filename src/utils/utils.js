const assistant = require('./../service/api-watson')
const Session = require('./../models/Session')

module.exports = {

  async createIDSession (number) {
    return new Promise((resolve, reject) => {
      assistant.createSession({
        assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719'
      })
        .then(async res => {
          const ID = res.result.session_id
          console.log(res.result.session_id)

          await Session.create({
            session_id: ID,
            number_user: number
          })

          resolve(ID)
        })
    })
  },

  async getTalkIzanagi (textTalk, id) {
    return new Promise((resolve, reject) => {
      assistant.message({
        assistantId: 'c5315746-f92d-429e-9bb1-436a3ce8a719',
        sessionId: id,
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
