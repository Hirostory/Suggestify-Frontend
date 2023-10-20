import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/register`);
      const data = await response.json();
      setUser(data);
      console.log("this from the fetchusers ", data)
  } catch (error) {
      console.error('Error fetching user:', error);
  }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/user/login', { username, password })
      const token = response.data.token
      const userId = response.data.userId
      console.log("response data: ", response.data)
      console.log("this is where we getting", userId)
      alert('Login successful')
      setUsername('')
      setPassword('')
      fetchUsers()
      localStorage.setItem('token', token)
      navigate(`/user/${userId}`)

      window.location.reload();
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
