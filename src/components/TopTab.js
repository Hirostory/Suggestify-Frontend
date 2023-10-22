import { useState } from "react"
import "../toptab.css"
import User from "./User"
import Login from "../pages/Login/Login"
import NavBar from "./NavBar"

const TopTab = (props) => {

    const [ toggle, setToggle ] = useState(1)

    const toggleTab = (index) => {
        setToggle(index)
    }

    return (
        <div className="container">

            <div className="bloc-tabs">
                <div className={toggle === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Home</div>
                <div className={toggle === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Login</div>
                <div className={toggle === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Register</div>
            </div>

            <div className="content-tabs">
                <div className={toggle === 1 ? "content active-content" : "content"}>
                    <h2>SUGGESTIFY</h2>
                </div>
                <div className={toggle === 2 ? "content active-content" : "content"}>
                    <NavBar />
                    <Login />
                </div>
                <div className={toggle === 3 ? "content active-content" : "content"}>
                
                </div>
            </div>
        </div>
    )
}

export default TopTab