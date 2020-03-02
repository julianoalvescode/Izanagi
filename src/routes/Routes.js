const express = require('express')
const routes = express.Router()

const izanagiController = require('./../controllers/izanagiController')

routes.get('/', izanagiController.serverON)

routes.post('/sms', izanagiController.sendMessage)

module.exports = routes
