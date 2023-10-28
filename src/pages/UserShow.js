import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const URL = `https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user`

const UserShow = (props) => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${URL}/${userId}`)
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [userId])

  const navigate = useNavigate()

  const handleSettings = () => {
    navigate(`/user/${userId}/settings`)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <h2>Collections:</h2>
        <ul>
          {user.collectionsName &&
            user.collectionsName.map((collection) => (
              <li key={collection._id}>
                <h2>{collection.name}</h2>
                <img src={collection.image} alt={collection.name} />
                <p>{collection.description}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default UserShow

