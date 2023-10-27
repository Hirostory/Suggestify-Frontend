import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import UserIndex from "../pages/UserIndex"
import UserShow from "../pages/UserShow"
import UserInfo from "../pages/UserInfo"
import BottomTab from "./BottomTab"
import UserBottomTab from "./UserBottomTab"


const URL = "http://localhost:4000/user"


const User = (props) => {
    const [user, setUser] = useState(null)
    const [collection, setCollection] = useState(null)

    const getUser = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setUser(data)
        console.log(data)
    }


    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/" element={< UserIndex user={user} />} />
        
            </Routes>

        </div>
    )
}

export default User