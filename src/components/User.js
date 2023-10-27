import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import UserIndex from "../pages/UserIndex";
import UserShow from "../pages/UserShow";
import UserInfo from "../pages/UserInfo";

const URL = "https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user"


const User = (props) => {
    const [user, setUser] = useState(null)

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