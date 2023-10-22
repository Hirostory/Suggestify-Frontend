import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import CollectionIndex from "../pages/Collection/CollectionIndex"
import UserIndex from "../pages/User/UserIndex"
import CollectionCreation from "../pages/Collection/CollectionCreation"

const URL = "http://localhost:4000/collection"

const Collection = (props) => {
    const {userId} = props
    const [collection, setCollection] = useState(null)

    const getCollection = async () => {
        const response = await fetch(`${URL}?userId=${userId}`)
        const data = await response.json()
        setCollection(data)
        console.log(data)
    }

    const createCollection = async (collection, id) => {
        const response = await fetch(`${URL}/${id}`, {
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
        await fetch(URL + '/' + id, {
            method: "put",
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
                < CollectionIndex 
                    collection={collection} 
                    createCollection={createCollection} 
                /> }  />
            </Routes>
            
        </div>
    )
}

export default Collection