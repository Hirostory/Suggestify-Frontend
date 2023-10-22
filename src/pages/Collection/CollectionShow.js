import React, { useEffect, useState } from "react"

const CollectionShow = ({ collectionId }) => {
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`http://localhost:4000/collection/collections/${collectionId}`)
        if (response.ok) {
          const data = await response.json()
          setCollection(data)
        } else {
          console.error("Failed to fetch collection details")
        }
      } catch (error) {
        console.error("Error fetching collection:", error)
      }
    }

    fetchCollection()
  }, [collectionId])

  if (!collection) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{collection.name}</h1>
      <img src={collection.image} alt={collection.name} />
      <p>{collection.description}</p>
      <h2>Recommendations</h2>
      {collection.recommendation.map((recommendation) => (
        <div key={recommendation._id}>
          <h3>{recommendation.title}</h3>
          <img src={recommendation.image} alt={recommendation.title} />
          <p>{recommendation.reviewDescription}</p>
        </div>
      ))}
    </div>
  )
}

export default CollectionShow
