import { useState } from "react";

const CollectionCreation = (props) => {

    const [newForm, setNewForm] = useState({
        name: "",
        description: "",
        image: "",
        enum: ["TV Show"]
    })

    const handleChange = (event) => {
        setNewForm(prev => ({
            ...prev, 
            [event.target.name]: event.target.value
        }))
    }
        
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted: ", newForm)
        console.log("User ID: ", props.userId);
        props.createCollection(newForm, props.userId)
        // window.location.reload()
    }

    return (
        <div className="forum-container">
                <section>
                <h2>Create Collection</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange} 
                    />
                    <input
                    type="text"
                    value={newForm.description}
                    name="description"
                    placeholder="description"
                    onChange={handleChange} 
                    />
                    <input
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange} 
                    />
                    <select
                        className="enum-scroll"
                        name="enum"
                        value={newForm.enum}
                        onChange={handleChange}
                    >
                        <option value="TV Show">TV Show</option>
                        <option value="Movie">Movie</option>
                        <option value="Book">Book</option>
                        <option value="Product">Product</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Playlist">Playist</option>
                    </select>
                        <input type="Submit" value="Create Collection" />
                </form>
            </section>
        </div>

    )
}

export default CollectionCreation