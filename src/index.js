const express = require('express')
const app = express()

const Routes = require('./routes/Routes')

var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Umbler listening on port %s', port)
})

app.use(express.urlencoded({ extended: true }))
app.use(Routes)
