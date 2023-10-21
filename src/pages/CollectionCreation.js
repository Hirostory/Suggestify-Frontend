import { useState } from "react";
import { Link } from "react-router-dom";

const CollectionCreation = (props) => {

    const [newForm, setNewForm] = useState({
        name: "",
        description: "",
        image: "",
        enum: ["TV Show", "Movie", "Book", "Product", "Restaurant"]
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
        props.createCollection(newForm)
    }

    return (
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
                {/* <select
                    name="enum"
                    value={newForm.enum}
                    onChange={handleChange} 
                >
                    {newForm.enum.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select> */}
                    <input type="Submit" value="Create Collection" />
            </form>
        </section>

    )
}

export default CollectionCreation