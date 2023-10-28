import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // fetch user data
  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user/register`);
      const data = await response.json();
      setUser(data);
      console.log("this from the fetchusers ", data)
  } catch (error) {
      console.error('Error fetching user:', error)
  }
  }

  // handle login process
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user/login', { username, password })
      const token = response.data.token
      const userId = response.data.userId
      localStorage.setItem('userId', userId)
      localStorage.setItem('token', response.data.token)
      console.log("response data: ", response.data)
      console.log("this is where we getting", userId)


      alert('Login successful')
      setUsername('')
      setPassword('')
      fetchUsers()
      localStorage.setItem('token', token)
      navigate(`/user/${userId}`)

      window.location.reload()
    } catch (error) {
      console.log('Login Error')
    }
  }
    useEffect(() => {
      fetchUsers()
      }, [])

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>LOGIN</h2>
      </div>
      <form onSubmit={handleLogin}>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="center-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
