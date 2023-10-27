import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../forums-css.css"

const CollectionUpdate = (props) => {
    const params = useParams()
    const navigate = useNavigate()

    const collection = props.collection.find((c) => {
        return c._id === params.id
    })

    const [updateForm, setUpdateForm] = useState ({
        name: collection.name,
        description: collection.description,
        image: collection.image,
        enum: [collection.enum]
    })

    const handleChange = (event) => {
        setUpdateForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateCollection(updateForm, params.id)
        navigate(`/user/${collection.user}`)
    }

    return (
        <div className="forum-container">
            <div>
                <h1>Current Collection</h1>
                <h1>{collection.name}</h1>
                {/* <img src={collection.image} alt={collection.name}/> */}
            </div>
            <section>
            <h2>Create Collection</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={updateForm.name}
                name="name"
                placeholder="name"
                onChange={handleChange} 
                />
                <input
                type="text"
                value={updateForm.description}
                name="description"
                placeholder="description"
                onChange={handleChange} 
                />
                <input
                type="text"
                value={updateForm.image}
                name="image"
                placeholder="Image URL"
                onChange={handleChange} 
                />
                <select
                    className="enum-scroll"
                    name="enum"
                    value={updateForm.enum}
                    onChange={handleChange}
                >
                    <option value="TV Show">TV Show</option>
                    <option value="Movie">Movie</option>
                    <option value="Book">Book</option>
                    <option value="Product">Product</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Playlist">Playist</option>
                </select>
                    <input type="Submit" value="Update Collection" />
            </form>
        </section>
        </div>
    )
}

export default CollectionUpdate