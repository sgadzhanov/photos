import { useEffect, useState } from "react"
import PhotoItem from "../components/PhotoItem"
import './App.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(false)
  const [isModified, setIsModified] = useState(false)
  const [editPhoto, setEditPhoto] = useState(null)

  useEffect(() => {
    async function fetchPhotos() {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/photos')
        const data = await response.json()

        setPhotos(data)
      } catch (e) {
        console.log('There was an error fetching the images from the api.', e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPhotos()
  }, [isModified])

  async function submitHandler(e) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)

    try {
      const response = await fetch('http://localhost:5000/api/photos', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        setError(true)
      }

      setIsModified(true)
      setTitle('')
      setDescription('')
      setImage(null)
    } catch (e) {
      console.log('There was an error uploading the image.', e)
      setError(true)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteHandler(id) {
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/photos/' + id, {
        method: 'DELETE',
      })
      if (!res.ok) {
        setError(true)
        setIsModified(true)
      }
    } catch (e) {
      console.log(e)
      setIsModified(true)
    } finally {
      setIsLoading(false)
    }
  }


  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>
  }

  return (
    <main>
      {isLoading && <p style={{ textAlign: 'center' }}>Uploading, please wait...</p>}
      {error && <p style={{ textAlign: 'center' }}>There was an error uploading the image.</p>}
      <form onSubmit={submitHandler} className='images__form'>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Upload Photo</button>
      </form>
      <div className='photos__container'>
        {photos.map(photo => (
          <PhotoItem
            key={photo.imageUrl}
            photo={photo}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </main>
  )
}

export default App
