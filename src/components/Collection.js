import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

const URL = "http://localhost:3000/collection"

const Collection = (props) => {
    const [collection, setCollection] = useState(null)

    const getCollection = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCollection(data)
        console.log(data)
    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        <div>
            <h1>COLLECTION</h1>
        </div>
    )
}

export default Collection