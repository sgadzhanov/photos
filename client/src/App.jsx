import React, { useEffect, useState } from "react"
import PhotoItem from "./components/PhotoItem"
import "./App.css"
import { usePhotos } from "./hooks/usePhotos"

function App() {
const {
  photos,
  isLoading,
  handleInputChange,
  formData,
  handleFileChange,
  deleteHandler,
  handleEdit,
  submitHandler,
  error,
} = usePhotos()

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
