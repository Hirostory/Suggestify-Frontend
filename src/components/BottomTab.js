import { useState } from "react"
import "../bottomtab.css"
import Collection from "./Collection"
import Recommendation from "./Recommendation"
import User from "./User"
import { Routes, Route } from "react-router-dom"
import UserShow from "../pages/UserShow"

const BottomTab = (props) => {

    const [ toggle, setToggle ] = useState(1)

    const isUserSignedIn = !!localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    const toggleTab = (index) => {
        setToggle(index)
    }

    return (
        <div className="container">

            <div className="bloc-tabs">
                <div className={toggle === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Tab 1</div>
                <div className={toggle === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Tab 2</div>
                <div className={toggle === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Tab 3</div>
            </div>

            <div className="bottom-content-tabs">
                <div className={toggle === 1 ? "content active-content" : "content"}>
                    <div>
                        <Routes>
                            {isUserSignedIn && <Route path='/user/:userId' element={<UserShow />} /> }
                        </Routes>
                        <User />
                        <Collection />
                        <Recommendation />
                    </div>
                </div>
                <div className={toggle === 2 ? "content active-content" : "content"}>
                    <h2>CREATION</h2>
                </div>
                <div className={toggle === 3 ? "content active-content" : "content"}>
                    <h2>whatever</h2>
                </div>
            </div>
        </div>
    )
}

export default BottomTab