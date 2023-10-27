import { useState, useEffect } from "react"
import "../bottomtab.css"
import { Routes, Route } from "react-router-dom"
import { useParams, Link } from "react-router-dom"
import CollectionCreation from "../pages/CollectionCreation"

const URL = `https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user`

const UserBottomTab = (props) => {
    const [ toggle, setToggle ] = useState(1)
    const { userId, params } = useParams()
    const [user, setUser] = useState(null)

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

    
    
   
    const toggleTab = (index) => {
        setToggle(index)
    }

    
    const handleDelete = (collectionId) => {
        props.deleteCollection(collectionId)
        window.location.reload()
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
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
                <h5 className="categoryname">{collection.enum}</h5>
              </div>
            ))}
            <div className={toggle === "add" ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab("add")}>
                <h5 className="categoryname" >Add</h5>
            </div>
          </div>
    
          <div className="bottom-content-tabs">
            {user.collectionsName && user.collectionsName.map((collection, index) => (
              <>
                <div
                    key={collection._id}
                    className={toggle === index + 1 ? "content active-content" : "content"}
                >
                   <div className="container-collection-main">
                    <div className="top-collection">
                    <h1>COLLECTION</h1>
                    <h2>{collection.name}</h2>
                    {/* <img src={collection.image} alt={collection.name} /> */}
                    <p>{collection.description}</p>
                    </div>
                    <div className="bottom-button-collection">
                            <button className="collection-delete-edit" onClick={() => handleDelete(collection._id)} id="delete">Delete Collection</button>
                            <Link to={`/collection/${collection._id}`}>
                            <button className="collection-delete-edit"  >Edit Collection</button>
                            </Link>
                    </div>
                   </div>
            <div className="recommendation-box" >
                {user.recommendation && user.recommendation.map((recommendation) => {
                    if (collection._id === recommendation.collectionName) {
                        // console.log("this is collection's reccomendation id", collection.recommendation)
                        // console.log("this is recommendation id", recommendation._id)
                        return (
                            <div className="recommendation-conatiner" key={recommendation._id}>
                                <img className="recom-image" src={recommendation.image} alt={recommendation.title} />
                                <div className="recommendation-info">
                                    <Link to={recommendation.link}>
                                    <h3 className="image-text">{recommendation.title}</h3>
                                    </Link>
                                    <p className="image-text">{recommendation.reviewDescription}</p>
                                    <Link to={`/recommendation/update/${recommendation._id}`}>
                                    <button className="rec-button">Update</button>
                                </Link>
                            </div>
                            </div>
                        )  
                        }            
                })}
            </div>
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
          </div>
        </div>
      )
}

export default UserBottomTab