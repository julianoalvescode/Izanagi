const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://juliano:<password>@izanagi-hnoqu.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
