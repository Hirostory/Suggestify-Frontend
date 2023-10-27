import {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"

const URL = `http://localhost:4000/user`

const UserInfo = (props) => {
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        try {
            const response = await fetch(`${URL}/${userId}`)
            const data = await response.json()
            setUser(data)
            console.log("this is userinfo",data)
        } catch (error) {
            console.error('Error fetching user:', error)
        }
    }
    
    useEffect(() => {
        fetchUser()
    }, [])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <img src={user.profilePicture} alt={user.username} />
        </div>
    )
}


export default UserInfo