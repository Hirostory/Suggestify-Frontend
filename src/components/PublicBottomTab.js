import { useState, useEffect } from "react"
import "../bottomtab.css"
import { useParams, useNavigate, Link } from "react-router-dom"

const URL = `https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user`

const PublicBottomTab = (props) => {
    const [ toggle, setToggle ] = useState(1)
    const { userId } = useParams()
    const [user, setUser] = useState(null)

     const fetchUser = async () => {
            try {
                const response = await fetch(`${URL}/${userId}`);
                const data = await response.json();
                setUser(data);
                console.log("this is PublicBottomTab: ",data)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

    const toggleTab = (index) => {
        setToggle(index)
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div>
                <h1>{user.username}</h1>
                <img src={user.profilePicture} alt={user.username} />
            </div>
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
                        </div>
                    )  
                    }            
            })}
                </div> 
              </>
            ))}
            
          </div>
        </div>
        </div>

        
      )
}

export default PublicBottomTab