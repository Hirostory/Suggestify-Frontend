import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CollectionIndex from "../pages/CollectionIndex";
import UserIndex from "../pages/UserIndex";
import CollectionCreation from "../pages/CollectionCreation";

const URL = "http://localhost:3000/collection"

const Collection = (props) => {
    const {userId} = props
    const [collection, setCollection] = useState(null)

    const getCollection = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCollection(data)
        console.log(data)
    }

    const createCollection = async (collection) => {
        const response = await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(collection)
        })
        console.log(collection)
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
                element=
                {
                <>
                < CollectionIndex 
                    collection={collection} 
                    createCollection={createCollection} 
                />
                < CollectionCreation 
                    collection={collection} 
                    createCollection={createCollection}
                />
                </>
                } 
                 />
            </Routes>
            
        </div>
    )
}

export default Collection