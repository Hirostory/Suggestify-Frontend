import { useState, useEffect } from "react"
import "../bottomtab.css"
import User from "./User"
import { Routes, Route } from "react-router-dom"
import { useParams } from "react-router-dom"
import PublicBottomTab from "./PublicBottomTab"


const URL = `http://localhost:4000/user`

const BottomTab = (props) => {
    const [ toggle, setToggle ] = useState(1)
    const { userId } = useParams()
    const [user, setUser] = useState(null)
 
   
    const toggleTab = (index) => {
        setToggle(index)
    }

    return (
       

        <div className="container">
           <div>
                <Routes>
                    <Route path="/" element={< User />}/>
                    <Route path="/public/user/:userId" element={< PublicBottomTab
                    />} />
                </Routes>
            </div>
        </div>
    )
}

export default BottomTab


