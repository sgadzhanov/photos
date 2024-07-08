const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
})

module.exports = mongoose.model('Photo', photoSchema)
