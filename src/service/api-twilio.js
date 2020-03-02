
const accountSid = 'ACa293c5c5e846b47704f16e1d755c1037'
const authToken = '0cf943a09a2d02821fb203834f81f56d'
const client = require('twilio')(accountSid, authToken)

module.exports = client
