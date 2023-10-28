import { Routes, Route, Navigate, Params, useParams } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import BottomTab from "./components/BottomTab";
import TopTab from "./components/TopTab";
import UserInfo from './pages/UserInfo'
import UserBottomTab from './components/UserBottomTab'
import CollectionUpdate from './pages/CollectionUpdate'
import RecommendationCreation from './pages/RecommendationCreation'
import RecommendationUpdate from './pages/RecommendationUpdate'
import axios from 'axios'

axios.defaults.baseURL = 'https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/'

const userURL = 'https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user'
const URL = "https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/collection"
const recURL = "https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/recommendation"

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const { userId } = useParams()
  const [collection, setCollection] = useState(null)
  const [recommendation, setRecommendation] = useState(null)

  // console.log("the params is ",userId)

  const updateUser = async (updateData) => {
    try {
      const response = await fetch(`${userURL}/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })
      if (response.ok) {
        getCollection()
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating user:', error)
      return false
    }
  }

    const getCollection = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCollection(data)
    }
    

    const createCollection = async (collection, userId) => {

      const url = `https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/collection/${userId}/add`

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
  

  const deleteUser = async () => {
    try {
      const response = await fetch(`${userURL}/${userId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        localStorage.clear()
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting user:', error)
      return false
    }
  }

  useEffect(() => {
    getCollection()
  }, [userId])

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
    const url = `https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/${userId}/add`

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
      getRecommendation()
    }, [])

  return (
    <div className="App">

      
      

      <TopTab updateUser={updateUser} deleteUser={deleteUser} />

       
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

