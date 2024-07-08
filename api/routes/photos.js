const express = require('express')
const router = express.Router()
const multer = require('multer')

const Photo = require('../models/Photo')

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + '-' + file.originalname) // Rename file to avoid conflicts
  }
})

const upload = multer({ storage: imageStorage })

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

// DELETE - delete a photo

router.delete('/:id', async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id)

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' })
    }

    res.json({ message: 'Photo deleted successfully' })
  } catch (e) {
    console.log('There was an error deleting the photo:', e)
    res.status(500).json({ message: e.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedPhoto) {
      return res.status(404).json({ message: 'Photo not found' })
    }

    res.json(updatedPhoto)
  } catch (e) {
    console.log('There was an error updating the photo:', e)
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
