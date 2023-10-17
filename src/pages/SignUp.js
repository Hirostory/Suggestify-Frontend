import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const[user, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3000/user/register') // URL for backend
        .then((res) => {
            // console.log(res.data)
        })
    }

    const handleRegister = (event) => {
        event.preventDefault()
        axios
        .post('http://localhost:3000/user/register', { username, password })
        .then(() => {
            alert('Registration Successful')
            setUsername('')
            setPassword('')
            fetchUsers()
            navigate('/login')
        })
        .catch((error)=> {
            console.log('Unable to register user')
        })
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
