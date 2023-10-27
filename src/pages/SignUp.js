import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

   

    const fetchUsers = () => {
      axios
        .get('https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user/register') // URL for backend
        .then((res) => {
          // You can handle the response data here if needed
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
        })
    }

    const handleRegister = (event) => {
        event.preventDefault()
        axios
        .post('https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user/register', { username, password })
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

    useEffect(() => {
            fetchUsers()
        }, [])
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
