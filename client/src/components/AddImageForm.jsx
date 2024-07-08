export default function AddImageForm({
  submitHandler,
  handleInputChange,
  formData,
  handleFileChange,
  error,
}) {
  return (
    <div>
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
          min="2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          min="2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload Photo</button>
      </form>
    </div>
  )
}
