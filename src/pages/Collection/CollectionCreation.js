import React, { useState } from "react"

const CollectionCreation = (props) => {
  const [newCollection, setNewCollection] = useState({
    image: "",
    type: "TV Show", // initial value is TV Show
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewCollection((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.createCollection(newCollection)
  }

  return (
    <section>
      <h2>Create Collection</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Collection Type:
          <select name="type" value={newCollection.type} onChange={handleChange}>
            <option value="TV Show">TV Show</option>
            <option value="Movie">Movie</option>
            <option value="Book">Book</option>
            <option value="Product">Product</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newCollection.image}
          onChange={handleChange}
        />
        <button type="submit">Create Collection</button>
      </form>
    </section>
  )
}

export default CollectionCreation


