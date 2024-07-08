const mongoose = require('mongoose')
const Photo = require('./models/Photo')

const DUMMY_PHOTOS = [
  {
    title: 'Sunset',
    description: 'A beautiful sunset.',
    imageUrl: 'https://storage.googleapis.com/pod_public/1300/122734.jpg'
  },
  {
    title: 'Forest',
    description: 'A dense forest with towering trees.',
    imageUrl: 'https://cdn.britannica.com/95/136995-050-6209F94F/rainforest-Malaysia.jpg'
  },
  {
    title: 'Euro 2024',
    description: 'Official Euro 2024 game ball.',
    imageUrl: 'https://www.aljazeera.com/wp-content/uploads/2024/06/2024-06-10T150230Z_344646471_UP1EK6A15S39K_RTRMADP_3_SOCCER-EURO-STUTTGART-STADIUM-1718113182.jpg?resize=770%2C513&quality=80'
  },
]

async function seedDB() {
  try {
    // add photos if the db is empty
    const photosCount = await Photo.countDocuments()
    if (photosCount === 0) {
      await Photo.insertMany(DUMMY_PHOTOS)
      console.log('Database seeded.')
    } else {
      console.log('Database already contains data. No seeding necessary.')
    }
  } catch (e) {
    console.log('There was an error seeding the db:', e)
  }
}

module.exports = seedDB
