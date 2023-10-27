import React, { useState } from "react"
import { Link } from "react-router-dom"
import "../UserIndex.css"

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
            <h5 className="categoryname" >Users</h5>
          </div>
        </div>

        
            <div className="bottom-content-tabs">
            <div className={ toggle === 1 ? "content active-content" : "content"}>
                <div className="tab-public-below">
                    <h1 className="user-title">LIST OF USERS</h1>
                    <div className="bar-design"></div>
                    <div className="user-container-main">
                        {props.user.map((user) => (
                        <div key={user._id} className="user-index-container">
                            <div className="User-profile">
                                <img className="index-images" src={user.profilePicture} alt={user.username} />
                                <Link to={`/public/user/${user._id}`}>
                                <h1 className="User-name-pic">{user.username}</h1>
                                </Link>
                            </div>
                        </div>
                        ))}
                        <div className="bar-design"></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>
  }

  return <div>{props.user ? loaded() : loading()}</div>
}

export default UserIndex

