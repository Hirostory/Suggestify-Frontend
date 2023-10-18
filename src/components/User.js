import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Collection from "./Collection";
import { Link } from "react-router-dom";

const URL = "http://localhost:3000/user"

const User = (props) => {
    const [user, setUser] = useState(null)

    const getUser = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setUser(data)
        console.log(data)
    }

    const userId = "652ddc9eb89735f5b06b69aa"

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <h1>USER</h1>
            <button>
                <Link to={`/collection/${userId}/add`}>create new collection</Link>
            </button>
            <Collection userId={userId}/>
        </div>
    )
}

export default User