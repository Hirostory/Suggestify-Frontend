import { Routes, Route, Navigate, Params, useParams } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import BottomTab from "./components/BottomTab";
import TopTab from "./components/TopTab";
import User from "./components/User";
import UserShow from './pages/UserShow'
import UserInfo from './pages/UserInfo'
import UserBottomTab from './components/UserBottomTab'
import CollectionCreation from './pages/CollectionCreation'

const URL = "http://localhost:4000/collection"

function App() {
  // Checking if the user is signed in and grab user ID from localStorage
  const isUserSignedIn = !!localStorage.getItem('token')
  const userId = useParams()
  const [collection, setCollection] = useState(null)

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

    useEffect(() => {
      getCollection()
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
        <Routes>
          <Route path='/user/:userId' element={<UserBottomTab 
          createCollection={createCollection}
          userId={userId}

          />} />
        </Routes>
      ) : (
        <BottomTab />
      )}
    </div>
  )
}

export default App


