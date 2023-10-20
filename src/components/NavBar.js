
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/user')
    window.location.reload()
  }

  return (
    <nav>
      <Link to='/user'>
        <h1>Suggestify</h1>
      </Link>
      <ul>
        {isUserSignedIn ? (
          <>
            <Link to='user/account'>
              <li>Account</li>
            </Link>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <Link to='user'>
              <li>Login</li>
            </Link>
            <Link to='user/signup'>
              <li>Sign Up</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar

