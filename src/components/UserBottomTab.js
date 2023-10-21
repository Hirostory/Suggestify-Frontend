import { useState, useEffect } from "react"
import "../bottomtab.css"
import Collection from "./Collection"
import Recommendation from "./Recommendation"
import User from "./User"
import { Routes, Route } from "react-router-dom"
import { useParams } from "react-router-dom"
import UserShow from "../pages/UserShow"
import UserInfo from "../pages/UserInfo"
import CollectionCreation from "../pages/CollectionCreation"

const URL = `http://localhost:4000/user`

const UserBottomTab = (props) => {
    const isUserSignedIn = !!localStorage.getItem('token')
    const [ toggle, setToggle ] = useState(1)
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [selectedCollection, setSelectedCollection] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${URL}/${userId}`);
                const data = await response.json();
                setUser(data);
                console.log("this is userbottomtab: ",data)
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
              <>
                <div
                    key={collection._id}
                    className={toggle === index + 1 ? "content active-content" : "content"}
                >
                    <h2>Collection: {collection.name}</h2>
                    <img src={collection.image} alt={collection.name} />
                    <p>{collection.description}</p>
            {user.recommendation && user.recommendation.map((recommendation) => {
                if (collection._id === recommendation.collectionName) {
                    // console.log("this is collection's reccomendation id", collection.recommendation)
                    // console.log("this is recommendation id", recommendation._id)
                    return (
                        <div key={recommendation._id}>
                          <h3>{recommendation.title}</h3>
                          <img src={recommendation.image} alt={recommendation.title} />
                          <p>{recommendation.reviewDescription}</p>
                        </div>
                    )  
                    }            
            })}
                    
                </div> 
              </>
            ))}
            
                <div className={toggle === "add" ? "content active-content" : "content"}>
                    <CollectionCreation />
                </div>
                <div className={toggle === "update" ? "content active-content" : "content"}>
                    <h2>update</h2>
                </div>

          </div>
        </div>
      )
}

export default UserBottomTab