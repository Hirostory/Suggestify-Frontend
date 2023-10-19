import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
  }, [])

  const fetchUsers = () => {
    axios.get('http://localhost:3000/user/register')
      .then((res) => {
        console.log(res.data)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/user/login', { username, password })
      const token = response.data.token
      const userId = response.data.userId
      alert('Login successful')
      setUsername('')
      setPassword('')
      fetchUsers()
      localStorage.setItem('token', token)
      navigate(`/login/${userId}`)
    } catch (error) {
      console.log('Login Error')
    }
  }

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
