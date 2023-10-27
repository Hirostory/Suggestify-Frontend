import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecommendationUpdate = (props) => {
    const params = useParams()
    const navigate = useNavigate()

    const owner = props.collection.find((o) => {
        return o.user
    })

    const recommendation = props.recommendation.find((c) => {
        return c._id === params.id
    })

    const [updateForm, setUpdateForm] = useState ({
        title: recommendation.title,
        reviewDescription: recommendation.reviewDescription,
        image: recommendation.image,
        link: recommendation.link
    })

    const handleChange = (event) => {
        setUpdateForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateRecommendation(updateForm, params.id)
        navigate(`/user/${owner.user}`)
    }

    const handleDelete = () => {
        props.deleteRecommendation(params.id)
        navigate(`/user/${owner.user}`)   
    }

    return (
        <div className="forum-container">
            <div className="edit-rec-forum">
                <h1>Current Recommendationn</h1>
                <h1>{recommendation.name}</h1>
                <img src={recommendation.image} alt={recommendation.name}/>
                <button onClick={handleDelete} id="delete" >Delete Recommendation</button>
            </div>
            <section>
            <h2>Create recommendation</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={updateForm.title}
                name="title"
                placeholder="title"
                onChange={handleChange} 
                />
                <input
                type="text"
                value={updateForm.reviewDescription}
                name="reviewDescription"
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
                <input
                type="text"
                value={updateForm.link}
                name="link"
                placeholder="Link URL"
                onChange={handleChange} 
                />
                
                    <input type="Submit" value="Update Recommendation" />
            </form>
        </section>
        </div>
    )
}

export default RecommendationUpdate