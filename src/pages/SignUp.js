import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
      try {
          const response = await axios.get('http://localhost:4000/user/register')
          // console.log(response.data)
      } catch (error) {
          console.error('Error fetching users:', error.response?.data || error.message)
      }
  }

    const handleRegister = async (event) => {
      event.preventDefault()
      try {
        const response = await axios.post('http://localhost:4000/user/register', { username, password })
        const userId = response.data.userId
        localStorage.setItem('userId', userId)
        alert('Registration Successful')
        setUsername('')
        setPassword('')
        fetchUsers()
        navigate('/')
    } catch (error) {
        console.error('Unable to register user:', error.response?.data || error.message)
    }
}
       


  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>SIGN UP</h2>
      </div>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="center-button">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
