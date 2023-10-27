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
            <div className='profile-box'>
            <div className='profile-container'>
                <img className='profile-picture' src={user.profilePicture} alt={user.username} />
                <dic>
                    <h1 className='profile-name'>{user.username}</h1>
                    <div className='profile-name-loc-bio-social'>
                        <h4>Name: Person </h4>
                        <h4>Location Base: Location</h4>
                        <h4>Quick About Me:</h4>
                        <h4 className='p-s' >All social media logos</h4>
                    </div>
                </dic>
            </div>
        </div>
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
                    <h1 className="collection-log">COLLECTION</h1>
                    <h2 className="collection-name">{collection.name}</h2>
                    {/* <img src={collection.image} alt={collection.name} /> */}
                    <p className="info-descript">{collection.description}</p>
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
                            </div>
                            </div>
                        )  
                        }            
                })}
            </div>
                </div> 
              </>
            ))}
            
          </div>
        </div>
        </div>

        
      )
}

export default PublicBottomTab