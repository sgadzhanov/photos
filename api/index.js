const express = require('express')
const mongoose = require('mongoose')
const photosRouter = require('./routes/photos')
const seedDB = require('./db-script')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

mongoose.connect('mongodb://localhost/photo-gallery-db')

const db = mongoose.connection

db.on('error', error => console.log('There was an error connecting to db:', error))
db.once('open', async () => {
  console.log('Connected to db')
  await seedDB()
})

app.use('/api/photos', photosRouter)

app.listen(PORT, () => console.log('Server is running on port', PORT))
