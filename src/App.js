import { Routes, Route, Navigate, Params, useParams } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import BottomTab from "./components/BottomTab";
import TopTab from "./components/TopTab";
import UserInfo from './pages/UserInfo'
import UserBottomTab from './components/UserBottomTab'
import CollectionUpdate from './pages/CollectionUpdate'
import Recommendation from './components/Recommendation'
import RecommendationCreation from './pages/RecommendationCreation'
import RecommendationUpdate from './pages/RecommendationUpdate'


const URL = "http://localhost:4000/collection"
const recURL = "http://localhost:4000/recommendation"

function App() {
  // Checking if the user is signed in and grab user ID from localStorage
  const isUserSignedIn = !!localStorage.getItem('token')
  const userId = useParams()
  const [collection, setCollection] = useState(null)
  const [recommendation, setRecommendation] = useState(null)

  console.log("the params is ",userId)

    const getCollection = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCollection(data)
        console.log("this is get collection in app.js",data)
    }
    

    const createCollection = async (collection, userId) => {

      const url = `http://localhost:4000/collection/${userId}/add`

        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(collection)
        })
        console.log(collection)
        const createdCollection = await response.json()
        setCollection((prev) => [...prev, createdCollection]) 
    }

    const updateCollection = async (collection, id) => {
      await fetch(`${URL}/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection)
      })
      getCollection()
    }

    const deleteCollection = async (id) => {
      await fetch(`${URL}/${id}`, {
        method: "delete"
      })
      getCollection()
    }

    const getRecommendation = async () => {
      const response = await fetch(recURL)
      const data = await response.json()
      setRecommendation(data)
      console.log("this is getting recommendation", data)
  }

  const createRecommendation = async (recommendation, userId) => {
    const url = `http://localhost:4000/recommendation/${userId}/add`

        const response = await fetch(url, {
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

    const updateRecommendation = async (recommendation, id) => {
      await fetch(`${recURL}/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recommendation)
      })
      getRecommendation()
    }

    const deleteRecommendation = async (id) => {
      await fetch(`${recURL}/${id}`, {
        method: "delete"
      })
      getRecommendation()
    }

    useEffect(() => {
      getCollection()
      getRecommendation()
    }, [])

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/signup" element={<SignUp />} />
      </Routes>

      <TopTab />
      <Routes>
            {isUserSignedIn && <Route path='/user/:userId' element={<UserInfo />}/> }
      </Routes>
      {isUserSignedIn ? (
        <>
        <Routes>
          <Route path='/user/:userId' element={<UserBottomTab 
          createCollection={createCollection}
          deleteCollection={deleteCollection}
          userId={userId}
          />} />
          <Route path='/collection/:id' element={<CollectionUpdate 
          collection={collection}
          updateCollection={updateCollection}
          userId={userId}
          />} />
          <Route path='/recommendation/:id' element={<RecommendationCreation 
          recommendation={recommendation}
          createRecommendation={createRecommendation}
          userId={userId}
          collection={collection}
          />} />
          <Route path='/recommendation/update/:id' element={<RecommendationUpdate 
          recommendation={recommendation}
          updateRecommendation={updateRecommendation}
          deleteRecommendation={deleteRecommendation}
          collection={collection}
          />} />
        </Routes>
        </>
      ) : (
        <BottomTab />
      )}
    </div>
  )
}

export default App


