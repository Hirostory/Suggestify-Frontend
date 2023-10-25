import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import RecommendationIndex from "../pages/RecommendationIndex";
import RecommendationCreation from "../pages/RecommendationCreation";

const URL = "http://localhost:4000/recommendation"

const Recommendation = (props) => {
    const [recommendation, setRecommendation] = useState(null)

    const getRecommendation = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setRecommendation(data)
        console.log(data)
    }

    const createRecommendation = async (recommendation, id) => {
  
          const response = await fetch(`${URL}/${id}/add`, {
              method: "post",
              headers: {
                  "Content-Type": "application/json"
              }, 
              body: JSON.stringify(recommendation)
          })
          console.log(recommendation)
          const createdRecommendation = await response.json()
          setRecommendation((prev) => [...prev, createdRecommendation]) 
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
                <Route path={`/recommendation/:id`} element={
                        <RecommendationCreation 
                            createRecommendation={createRecommendation}
                            userId={props.userId}
                        />
                } />
            </Routes>
        </div>
        </div>
    )
}

export default Recommendation