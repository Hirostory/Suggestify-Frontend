import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  return (
    <nav>
      <ul>
        {isUserSignedIn ? (
          <>
            <Link to='/account'>
              <li>Account</li>
            </Link>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <Link to='/login'>
              <li>Login</li>
            </Link>
            <Link to='/signup'>
              <li>Sign Up</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar

