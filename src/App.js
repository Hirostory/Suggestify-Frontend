import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Account from './pages/Account/Account'
import BottomTab from './components/BottomTab'
import TopTab from './components/TopTab'
import UserShow from './pages/User/UserShow'
import UserInfo from './pages/User/UserInfo'
import UserBottomTab from './components/UserBottomTab'
import CollectionCreation from './pages/Collection/CollectionCreation'

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
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/signup" element={<SignUp />} />
        <Route path="collections" element={<CollectionCreation createCollection={createCollection} />} />
      </Routes>
      <TopTab />
      <Routes>
        {isUserSignedIn && <Route path='/user/:userId' element={<UserInfo />} />}
      </Routes>
      {isUserSignedIn ? (
        <Routes>
          <Route path='/user/:userId' element={<UserBottomTab createCollection={createCollection} />} />
        </Routes>
      ) : (
        <BottomTab />
      )}
    </div>
  )
}

export default App

