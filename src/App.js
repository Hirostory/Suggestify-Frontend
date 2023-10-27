import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import BottomTab from './components/BottomTab'
import TopTab from './components/TopTab'
import UserBottomTab from './components/UserBottomTab'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'
const URL = 'http://localhost:4000/collection'
const userURL = 'http://localhost:4000/user'
const recURL = 'http://localhost:4000/recommendation'

function App() {
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
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection),
    })
    const createdCollection = await response.json()
    setCollection((prev) => [...prev, createdCollection])
  }

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

  return (
    <div className="App">
      

      <TopTab updateUser={updateUser} deleteUser={deleteUser} />

      <Routes>
        {isUserSignedIn && <Route path="user/:userId" element={<UserBottomTab />} />}
      </Routes>

      <Routes>
        {/*<Route path="collection/:id" element={<CollectionUpdate collection={collection} updateCollection={updateCollection} />} /> */}
      </Routes>

      {isUserSignedIn ? (
        <BottomTab deleteUser={deleteUser} />
      ) : (
        <Navigate to="/user/signup" />
      )}
    </div>
  )
}

export default App

