const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
  session_id: String,
  number_user: String
})

module.exports = mongoose.model('Session', SessionSchema)
