const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const Photo = require('../models/Photo')

// GET - fetch paginated photos
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 6

  const skip = limit * (page - 1)

  try {
    const photos = await Photo.find().skip(skip).limit(limit)
    res.json(photos)
  } catch (e) {
    console.log('There was an error fetching photos:', e)
  }
})


// POST - create a photo
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body

    const imageUrl = req.file.path
    const newPhoto = new Photo({ title, description, imageUrl })

    await newPhoto.save()

    res.status(201).json({ photo: newPhoto })
  } catch (e) {
    console.log('There was an error creating a new photo:', e)
    res.status(500).json({ message: e.message })
  }
})

module.exports = router