import React, { useEffect, useState } from "react"
import PhotoItem from "../components/PhotoItem"
import "./App.css"

function App() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  })
  const [error, setError] = useState(false)

  async function fetchPhotos() {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/photos")
      const data = await response.json()
      setPhotos(data)
    } catch (error) {
      console.error("Error fetching photos:", error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formDataToSubmit = new FormData()
    formDataToSubmit.append("title", formData.title)
    formDataToSubmit.append("description", formData.description)
    formDataToSubmit.append("image", formData.image)

    try {
      const response = await fetch("http://localhost:5000/api/photos", {
        method: "POST",
        body: formDataToSubmit,
      })

      if (!response.ok) {
        throw new Error("Failed to upload photo")
      }

      setIsLoading(false)
      setFormData({ title: "", description: "", image: null })
      fetchPhotos()
    } catch (error) {
      console.error("Error uploading photo:", error)
      setError(true)
      setIsLoading(false)
    }
  }

  const deleteHandler = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/photos/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete photo")
      }
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo._id !== id))
    } catch (error) {
      console.error("Error deleting photo:", error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (editedPhoto) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `http://localhost:5000/api/photos/${editedPhoto._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPhoto),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update photo")
      }

      setIsLoading(false)
      fetchPhotos()
    } catch (error) {
      console.error("Error updating photo:", error)
      setError(true)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>
  }

  return (
    <main>
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>
          There was an error. Please try again.
        </p>
      )}
      <form onSubmit={submitHandler} className="images__form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload Photo</button>
      </form>
      <div className="photos__container">
        {photos.map((photo) => (
          <PhotoItem
            key={photo._id}
            photo={photo}
            onDelete={deleteHandler}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </main>
  )
}

export default App
