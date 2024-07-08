import PhotoItem from './PhotoItem'
import styles from './Photos.module.css'

export default function Photos({ data }) {
  console.log(data)
  return (
    <div className={styles.photos__container}>
      {data.map(photo => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  )
}