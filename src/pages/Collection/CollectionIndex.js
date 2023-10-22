import React from "react"
import { Link } from "react-router-dom"
import CollectionCreation from "./CollectionCreation"

const CollectionIndex = ({ collection, createCollection }) => {
  const loaded = () => {
    return collection.map((collection) => {
      return (
        <div key={collection._id} className="collection">
          <h1>{collection.name}</h1>
          <Link to={`/collection/${collection._id}`}>
            <h1>{collection.name}</h1>
          </Link>
          <img src={collection.image} alt={collection.name} />
          <h3>{collection.description}</h3>
        </div>
      )
    })
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <CollectionCreation createCollection={createCollection} />
      {collection ? loaded() : loading()}
    </div>
  )
}

export default CollectionIndex

