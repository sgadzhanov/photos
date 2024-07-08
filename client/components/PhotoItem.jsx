import styles from './PhotoItem.module.css'

export default function PhotoItem({
  photo,
}) {
  const isExternalUrl = photo.imageUrl.startsWith('http') || photo.imageUrl.startsWith('https');
  const imageUrl = isExternalUrl ? photo.imageUrl : `http://localhost:5000/${photo.imageUrl.replace(/\\/g, '/')}`;

  return (
    <div className={styles.photo__item}>
      <h3>{photo.title}</h3>
      <p>{photo.description}</p>
      <img src={imageUrl} alt={photo.title} />
      <button onClick={() => onEdit(photo)}>Edit</button>
      <button onClick={() => onDelete(photo._id)}>Delete</button>
    </div>
  )
}