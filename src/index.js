const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const Routes = require('./routes/Routes')

var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Umbler listening on port %s', port)
})

mongoose.connect('mongodb+srv://juliano:oXyBoCsmJdZMvtSH@izanagi-hnoqu.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(Routes)
