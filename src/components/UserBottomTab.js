import { useState, useEffect } from "react"
import "../bottomtab.css"
import Collection from "./Collection"
import Recommendation from "./Recommendation"
import User from "./User"
import { Routes, Route } from "react-router-dom"
import { useParams } from "react-router-dom"
import UserShow from "../pages/UserShow"
import UserInfo from "../pages/UserInfo"

const URL = `http://localhost:3000/user`

const UserBottomTab = (props) => {
    const isUserSignedIn = !!localStorage.getItem('token')
    const [ toggle, setToggle ] = useState(1)
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${URL}/${userId}`);
                const data = await response.json();
                setUser(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
    
   
    const toggleTab = (index) => {
        setToggle(index)
    }
    return (
        <div className="container">
          <div className="bloc-tabs">
            {user.collectionsName && user.collectionsName.map((collection, index) => (
              <div
                key={collection._id}
                className={toggle === index + 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(index + 1)}
              >
                {collection.enum}
              </div>
            ))}
            <div className={toggle === "add" ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab("add")}>add</div>
            <div className={toggle === "update" ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab("update")}>update</div>
          </div>
    
          <div className="bottom-content-tabs">
            {user.collectionsName && user.collectionsName.map((collection, index) => (
              <div
                key={collection._id}
                className={toggle === index + 1 ? "content active-content" : "content"}
              >
                <h2>Collection: {collection.name}</h2>
                <img src={collection.image} alt={collection.name} />
                <p>{collection.description}</p>
              </div>
            ))}
                <div className={toggle === "add" ? "content active-content" : "content"}>
                    <h2>add</h2>
                </div>
                <div className={toggle === "update" ? "content active-content" : "content"}>
                    <h2>update</h2>
                </div>
          </div>
        </div>
      )
}

export default UserBottomTab