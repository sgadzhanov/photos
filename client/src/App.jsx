import React, { useEffect, useState } from "react"
import PhotoItem from "./components/PhotoItem"
import "./App.css"
import { usePhotos } from "./hooks/usePhotos"
import AddImageForm from "./components/AddImageForm"

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
      <AddImageForm
        formData={formData}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        submitHandler={submitHandler}
        error={error}
      />
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
