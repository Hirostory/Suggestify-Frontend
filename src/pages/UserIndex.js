import React, { useState } from "react"
import { Link } from "react-router-dom"

const UserIndex = (props) => {
  const [toggle, setToggle] = useState(1)

  const toggleTab = (tab) => {
    setToggle(tab)
  }

  const loaded = () => {
    return (
      <div className="container">
        <div className="bloc-tabs">
          <div
            className={toggle === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Users
          </div>
        </div>

        <div className="bottom-content-tabs">
          <div className={toggle === 1 ? "content active-content" : "content"}>
            {props.user.map((user) => (
              <div key={user._id} className="user">
                <Link to={`/public/user/${user._id}`}>
                  <h1>{user.username}</h1>
                </Link>
                <img src={user.profilePicture} alt={user.username} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return <div>{props.user ? loaded() : loading()}</div>
}

export default UserIndex