import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import UserIndex from "../pages/UserIndex";
import UserShow from "../pages/UserShow";

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
            <h1>COLLECTION</h1>
            <Routes>
                <Route path="/user" element={< UserIndex user={user} />} />
                <Route path="/user/:id" element={
                    < UserShow 
                        user={user}
                    />
                }
                />
            </Routes>
        </div>
    )
}

export default User