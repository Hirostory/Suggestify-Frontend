import { useState } from "react";
import { Link } from "react-router-dom";

const UserIndex = (props) => {

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        profilePicture: ""
    })

    const handleChange = (event) => {
        setNewUser(prev => ({
            ...prev,
            [event.target.name]: event.target.value 
        })) 
    }

    const handleSubmit = (e) => {
            e.preventDefault()
            props.createUser(newUser)
        }


    const loaded = () => {
        return props.user.map((user) => {
            return (
                <div key={user._id} className="user" >
                    <Link to={`/user/${user._id}`} >
                        <h1>{user.username}</h1>
                    </Link>
                    <img src={user.profilePicture} alt={user.username} />
                </div>
            )
        })
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }
   
    return (
        <di>
        { props.user ? loaded() : loading()}
        </di>   
    )
}

export default UserIndex