import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UserUpdate = (props) => {
  const params = useParams()
  const userId = params.userId
  const navigate = useNavigate()


  const [updateForm, setUpdateForm] = useState({
    username: "",
    password: "",
    profilePicture: ""
  })

  const handleChange = (event) => {
    setUpdateForm({
      ...updateForm,
      [event.target.name]: event.target.value,
    })
  }

  const handleUpdateUsername = async () => {
    const success = await props.updateUser({ username: updateForm.username })
    if (success) {
      console.log("Username updated successfully")
    } else {
      console.error("Error updating username")
    }
  }

  const handleUpdatePassword = async () => {
    const success = await props.updateUser({ password: updateForm.password })
    if (success) {
      console.log("Password updated successfully")
    } else {
      console.error("Error updating password")
    }
  }

  const handleUpdateProfilePicture = async () => {
    const success = await props.updateUser({ profilePicture: updateForm.profilePicture })
    if (success) {
      console.log("Profile picture updated successfully")
    } else {
      console.error("Error updating profile picture")
    }
  }

  const handleDeleteUser = async () => {
    const success = await props.deleteUser()
    if (success) {
      console.log("User deleted successfully")
      navigate("/")
    } else {
      console.error("Error deleting user")
    }
  }

  
  return (
    <div className="update-container-user">
      <h1>Update Account</h1>

      <section>
      
        <input
          type="text"
          name="username"
          value={updateForm.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <button onClick={handleUpdateUsername}>Update Username</button>

        <input
          type="password"
          name="password"
          value={updateForm.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button onClick={handleUpdatePassword}>Update Password</button>

        <input
          type="text"
          name="profilePicture"
          value={updateForm.profilePicture}
          placeholder="Profile Picture URL"
          onChange={handleChange}
        />
        <button onClick={handleUpdateProfilePicture}>Change Profile Picture</button>
        


        <button onClick={handleDeleteUser}>Delete User</button>

        
      </section>
    </div>
  )
}

export default UserUpdate
