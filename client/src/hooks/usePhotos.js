import { useEffect, useState } from "react";

export function usePhotos() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  })

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

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  function handleFileChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }))
  }

  async function submitHandler(e) {
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

  async function deleteHandler(id) {
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

  async function handleEdit(editedPhoto) {
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

  return {
    photos,
    isLoading,
    handleInputChange,
    formData,
    handleFileChange,
    submitHandler,
    deleteHandler,
    handleEdit,
  }
}
