import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

const URL = "http://localhost:3000/recommendation"

const Recommendation = (props) => {
    const [recommendation, setRecommendation] = useState(null)

    const getRecommendation = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setRecommendation(data)
        console.log(data)
    }

    useEffect(() => {
        getRecommendation()
    }, [])

    return (
        <div>
            <h1>Recommendation</h1>
        </div>
    )
}

export default Recommendation