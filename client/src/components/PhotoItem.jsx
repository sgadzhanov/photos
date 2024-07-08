import React, { useState } from 'react'
import styles from './PhotoItem.module.css'

const PhotoItem = ({ photo, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false)
  const [editedTitle, setEditedTitle] = useState(photo.title)
  const [editedDescription, setEditedDescription] = useState(photo.description)
  const [editedImageUrl, setEditedImageUrl] = useState(photo.imageUrl)

  const isExternalUrl = editedImageUrl.startsWith('http') || editedImageUrl.startsWith('https')
  const imageUrl = isExternalUrl ? editedImageUrl : `http://localhost:5000/${editedImageUrl.replace(/\\/g, '/')}`

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleSaveClick = async () => {
    await onEdit({
      ...photo,
      title: editedTitle,
      description: editedDescription,
      imageUrl: editedImageUrl,
    })
    setEditMode(false)
  }

  const handleCancelClick = () => {
    setEditedTitle(photo.title)
    setEditedDescription(photo.description)
    setEditedImageUrl(photo.imageUrl)
    setEditMode(false)
  }

  const handleDeleteClick = () => {
    onDelete(photo._id)
  }

  return (
    <div className={styles.photo__item}>
      {!editMode ? (
        <>
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
          <img src={imageUrl} alt={photo.title} />
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      ) : (
        <div className='edit__form'>
          <div>
            <label htmlFor="title">Title</label>
            <input
              className={styles.edit__title}
              id='title'
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              min="2"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id='description'
              className={styles.edit__description}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              min="2"
            />
          </div>
          <div>
            <label htmlFor="image">Image Url</label>
            <input
              id='image'
              className={styles.edit__image}
              type="text"
              value={editedImageUrl}
              onChange={(e) => setEditedImageUrl(e.target.value)}
            />
          </div>
          <div className={styles.button__container}>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoItem
