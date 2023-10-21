import { useState } from "react";
import { Link } from "react-router-dom";

const RecommendationIndex = (props) => {

    const [newRecommendation, setNewRecommendation] = useState({
        title: "",
        reviewDescription: "",
        image: "",
        link: ""
    })

    const handleChange = (event) => {
        setNewRecommendation(prev => ({
            ...prev,
            [event.target.name]: event.target.value 
        })) 
    }

    const handleSubmit = (e) => {
            e.preventDefault()
            props.createRecommendation(newRecommendation)
        }


    const loaded = () => {
        return props.recommendation.map((recommendation) => {
            return (
                <div key={recommendation._id} className="recommendation" >
                    <Link to={`/recommendation/${recommendation._id}`} >
                        <h1>{recommendation.title}</h1>
                    </Link>
                    <img src={recommendation.image} alt={recommendation.image} />
                </div>
            )
        })
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }
   
    return (
        <di>
        { props.recommendation ? loaded() : loading()}
        </di>   
    )
}

export default RecommendationIndex