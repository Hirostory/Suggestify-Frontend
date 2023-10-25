import { useState, useEffect } from "react"
import "../bottomtab.css"
import { Routes, Route } from "react-router-dom"
import { useParams, useNavigate, Link } from "react-router-dom"
import CollectionCreation from "../pages/CollectionCreation"

const URL = `http://localhost:4000/user`

const UserBottomTab = (props) => {
    const isUserSignedIn = !!localStorage.getItem('token')
    const [ toggle, setToggle ] = useState(1)
    const { userId, params } = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [selectedCollection, setSelectedCollection] = useState(null)

    useEffect(() => {
        console.log("Neha is here ",props)
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

    
    const handleDelete = (collectionId) => {
        props.deleteCollection(collectionId)
        window.location.reload()
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
                    <div>
                            <button onClick={() => handleDelete(collection._id)} id="delete">Delete Collection</button>
                            <Link to={`/collection/${collection._id}`}>
                            <button>Edit Collection</button>
                            </Link>
                    </div>
            {user.recommendation && user.recommendation.map((recommendation) => {
                if (collection._id === recommendation.collectionName) {
                    // console.log("this is collection's reccomendation id", collection.recommendation)
                    // console.log("this is recommendation id", recommendation._id)
                    return (
                        <div key={recommendation._id}>
                          <h3>{recommendation.title}</h3>
                          <img src={recommendation.image} alt={recommendation.title} />
                          <p>{recommendation.reviewDescription}</p>
                          <Link to={`/recommendation/update/${recommendation._id}`}>
                          <button>Update Recommendation</button>
                          </Link>
                        </div>
                    )  
                    }            
            })}
                    <Link to={`/recommendation/${collection._id}`}>
                    <button>Add Recommendation</button>
                    </Link>
                </div> 
              </>
            ))}
            
                <div className={toggle === "add" ? "content active-content" : "content"}>
                    <CollectionCreation 
                        createCollection={props.createCollection}
                        userId={userId}
                    />
                </div>
                <div className={toggle === "update" ? "content active-content" : "content"}>
                    <div>
                        <h2>Update</h2>
                        <div>
                        {user.collectionsName && user.collectionsName.map((collection) => (
                            <>
                            <div>
                            <h4>{collection.name}</h4>
                            <button onClick={() => handleDelete(collection._id)} id="delete">Delete Collection</button>
                            </div>
                            </>
                            ))}
                        </div>
                    </div>

                </div>

          </div>
        </div>
      )
}

export default UserBottomTab