import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import UserIndex from "../pages/User/UserIndex"
import UserShow from "../pages/User/UserShow"
import Collection from "./Collection"
import UserInfo from "../pages/User/UserInfo"
import BottomTab from "./BottomTab"
import UserBottomTab from "./UserBottomTab"


const URL = "http://localhost:4000/user"
const collectionURL = "http://localhost:4000/collection"

const User = (props) => {
    const [user, setUser] = useState(null)
    const [collection, setCollection] = useState(null)

    const getUser = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setUser(data)
        console.log(data)
    }

    const getCollectionUser = async () => {
        const response = await fetch(collectionURL)
        const data = await response.json()
        setCollection(data)
        console.log(data)
    }

    useEffect(() => {
        getUser()
        getCollectionUser()
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/user" element={< UserIndex user={user} />} />
                <Route path="/user/:id" 
                element={
                    <>
                        < UserShow 
                            user={user}
                            collection={collection}
                        />
                        <UserInfo
                            user={user}
                            collection={collection} 
                        />
                        < UserBottomTab
                            user={user}
                            collection={collection} 
                        />
                   </> 
                }
                />
            </Routes>

        </div>
    )
}

export default User