import {useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"

const UserShow = (props) => {
    const params = useParams()
    const navigate = useNavigate()

    const user = props.user.find((p) => p._id === params.id)


    return (
        <div>
            <h1>{user.username}</h1>
            <img src={user.profilePicture} alt={user.username}/>
        </div>  
    )
}

export default UserShow