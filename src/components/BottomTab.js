import { useState, useEffect } from "react"
import "../bottomtab.css"
import { Routes, Route } from "react-router-dom"
import { useParams } from "react-router-dom"


const URL = `http://localhost:4000/user`

const BottomTab = (props) => {
    const isUserSignedIn = !!localStorage.getItem('token')
    const [ toggle, setToggle ] = useState(1)
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    
  
    
   
    const toggleTab = (index) => {
        setToggle(index)
    }

    
    }

export default BottomTab