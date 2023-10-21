import { useState, useEffect } from "react"
import "../bottomtab.css"
import Collection from "./Collection"
import Recommendation from "./Recommendation"
import User from "./User"
import { Routes, Route } from "react-router-dom"
import { useParams } from "react-router-dom"
import UserShow from "../pages/UserShow"
import UserInfo from "../pages/UserInfo"
import RecommendationIndex from "../pages/RecommendationIndex"

const URL = `http://localhost:4000/user`

const BottomTab = (props) => {
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
                <div className={toggle === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>tab 1</div>
                <div className={toggle === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Tab 2</div>
                <div className={toggle === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Tab 3</div>
            </div>

            <div className="bottom-content-tabs">
                <div className={toggle === 1 ? "content active-content" : "content"}>
                    <div>
                        <User />
                        <Collection />
                        <Recommendation />
                    </div>
                </div>
                <div className={toggle === 2 ? "content active-content" : "content"}>
                    
                </div>
                <div className={toggle === 3 ? "content active-content" : "content"}>
                    <h2>whatever</h2>
                </div>
            </div>
        </div>
    )
}

export default BottomTab