import { useState } from "react"
import "../toptab.css"
import User from "./User"

const TopTab = (props) => {

    const [ toggle, setToggle ] = useState(1)

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

            <div className="content-tabs">
                <div className={toggle === 1 ? "content active-content" : "content"}>
                    <h2>SUGGESTIFY</h2>
                </div>
                <div className={toggle === 2 ? "content active-content" : "content"}>
                    <h2>REGISTER/LOGIN</h2>
                </div>
                <div className={toggle === 3 ? "content active-content" : "content"}>
                    <User />
                </div>
            </div>
        </div>
    )
}

export default TopTab