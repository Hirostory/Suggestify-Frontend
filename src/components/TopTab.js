import React, { useState } from 'react'
import "../toptab.css"
import { useNavigate } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import UserUpdate from '../pages/User/UserUpdate'

const TopTab = (props) => {
    const [toggle, setToggle] = useState(1)
    const navigate = useNavigate()
    const [showLoginForm, setShowLoginForm] = useState(false)
    const isUserSignedIn = !!localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [showSignUp, setShowSignUp] = useState(false)

    const handleHome = () => {
        setToggle(1)
        navigate('/')
    }

    const handleSignOut = () => {
        if (userId) {
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
            navigate('/')
            window.location.reload()
        }
    }

    const handleSettings = () => {
        if (userId) {
            setToggle(3)
        }
    }

    const handleSignUp = () => {
        if (!userId) {
            setShowSignUp(true)
            setShowLoginForm(false)
            navigate('/')
        }
    }

    return (
        <div className="container">
            <div className="bloc-tabs">
                <div
                    className={toggle === 1 ? 'tabs active-tabs' : 'tabs'}
                    onClick={handleHome}
                >
                    Home
                </div>
                {isUserSignedIn ? (
                    <>
                        <div
                            className={toggle === 2 ? 'tabs active-tabs' : 'tabs'}
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </div>
                        <div
                            className={toggle === 3 ? 'tabs active-tabs' : 'tabs'}
                            onClick={handleSettings}
                        >
                            Settings
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className={toggle === 2 ? 'tabs active-tabs' : 'tabs'}
                            onClick={() => {
                                setToggle(2)
                                setShowLoginForm(true)
                                setShowSignUp(false)
                            }}
                        >
                            {showSignUp ? 'Register' : 'Login/Register'}
                        </div>
                    </>
                )}
            </div>

            <div className="content-tabs">
                <div className={toggle === 1 ? 'content active-content' : 'content'}>
                <div className="logo-conttainer">
                    <img className="logo-text" src="https://see.fontimg.com/api/renderfont4/vmW67/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjRTA4RUQ2IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/U1VHR0VTVElGWQ/super-boys.png" />
                    <div className="logo-circle"></div>
                    </div>
                </div>

                {isUserSignedIn ? (
                    <>
                        <div className={toggle === 2 ? 'content active-content' : 'content'}>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                        <div className={toggle === 3 ? 'content active-content' : 'content'}>
                            <UserUpdate updateUser={props.updateUser} deleteUser={props.deleteUser} userId={userId}/>
                            
                        </div>
                    </>
                ) : (
                    <div className={toggle === 2 ? 'content active-content' : 'content'}>
                        {showLoginForm && (
                            <>
                                <Login />
                                <div className="Sign Up">
                                    <p>Don't have an account?</p>
                                    <button onClick={() => {
                                        setShowSignUp(true)
                                        setShowLoginForm(false)
                                    }}>Sign Up</button>
                                </div>
                            </>
                        )}
                        {showSignUp && <SignUp />}
                    </div>
                )}
               
               
            </div>
        </div>
    )
}


export default TopTab

