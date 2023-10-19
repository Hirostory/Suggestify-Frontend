import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CollectionIndex from "../pages/CollectionIndex";
import UserIndex from "../pages/UserIndex";

const URL = "http://localhost:3000/collection"

const Collection = (props, {userId}) => {
    const [collection, setCollection] = useState(null)

    const getCollection = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCollection(data)
        console.log(data)
    }

    const createCollection = async (collection) => {
        const collectionWithUserId = { ...collection, userId}
        console.log("this is the collection with id" + collectionWithUserId)
        const response = await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(collectionWithUserId)
        })
        console.log(collectionWithUserId)
        const createdCollection = await response.json()
        setCollection((prev) => [...prev, createdCollection]) 
    }

    const updateCollection = async (collection, id) => {
        await fetch(URL + id, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collection),
        })
        getCollection()
    }

    const deleteCollection = async (id) => {
        await fetch(URL + id, {
            method: "delete",
        })
        getCollection()
    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        <div>
            <Routes>
                <Route path={`/collection`} 
                element={< CollectionIndex collection={collection} createCollection={createCollection} />} 
                
                />
            </Routes>
        </div>
    )
}

export default Collection