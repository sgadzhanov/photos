import { useEffect, useState } from "react"
import Photos from "../components/Photos"

function App() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchPhotos() {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/photos')
        const data = await response.json()

        setPhotos(data)
      } catch (e) {
        console.log('There was an error fetching the images from the api.', e);
      } finally {
        setIsLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>
  }
  return (
    <main>
      {isLoading && <p>Loading...</p>}
      <Photos data={photos} />
    </main>
  )
}

export default App
