import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const RecommendationCreation = (props) => {
    const params = useParams() 
    const navigate = useNavigate()

    const owner = props.collection.find((o) => {
        return o.user
    })
    
    const [newForm, setNewForm] = useState({
        title: "",
        reviewDescription: "",
        image: "",
        link: ""
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
        props.createRecommendation(newForm, params.id)
        navigate(`/user/${owner.user}`)
      }
      console.log("in the RecoomendationCreation params id",params.id)
      console.log("in the RecoomendationCreation user",owner.user)
      return (
        <div className="forum-container">
            <section>
              <h2>Create Recommendation</h2>
              <form onSubmit={handleSubmit}>
                  <input
                  type="text"
                  value={newForm.title}
                  name="title"
                  placeholder="title"
                  onChange={handleChange} 
                  />
                  <input
                  type="text"
                  value={newForm.reviewDescription}
                  name="reviewDescription"
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
                  <input
                  type="text"
                  value={newForm.link}
                  name="link"
                  placeholder="Link URL"
                  onChange={handleChange} 
                  />
                  
                      <input type="Submit" value="Create Collection" />
              </form>
          </section>
        </div>

    )
}

export default RecommendationCreation