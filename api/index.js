const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const photosRouter = require('./routes/photos')
const seedDB = require('./db-script')

const app = express()

// would be better ot use env variables
const PORT = 5000

app.use(express.json())

// never do that in production! Just for developing purpose.
app.use(cors({}))

// allow the images to be read from this folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// connect to db
mongoose.connect('mongodb://localhost/photo-gallery-db')

const db = mongoose.connection

db.on('error', error => console.log('There was an error connecting to db:', error))
db.once('open', async () => {
  console.log('Connected to db')
  await seedDB()
})

app.use('/api/photos', photosRouter)

app.listen(PORT, () => console.log('Server is running on port', PORT))
