import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import RecommendationIndex from "../pages/RecommendationIndex";

const URL = "http://localhost:4000/recommendation"

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
            <div>
            <Routes>
                <Route path={`/recommendation`} 
                element={< RecommendationIndex recommendation={recommendation} />} 
                
                />
            </Routes>
        </div>
        </div>
    )
}

export default Recommendation