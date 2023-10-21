import { Routes, Route, Navigate, Params } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
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
  const userId = localStorage.getItem('userId')

  const [collection, setCollection] = useState(null)

    const getCollection = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCollection(data)
        console.log(data)
    }

    const createCollection = async (collection) => {
        const response = await fetch(URL, {
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

          />} />
        </Routes>
      ) : (
        <BottomTab />
      )}
    </div>
  )
}

export default App


