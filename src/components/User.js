import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

const URL = "http://localhost:3000/user"

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
            <h1>USER</h1>
        </div>
    )
}

export default User