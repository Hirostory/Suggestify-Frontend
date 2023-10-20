import { Routes, Route, Navigate, Params } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import BottomTab from "./components/BottomTab";
import TopTab from "./components/TopTab";
import User from "./components/User";
import UserShow from './pages/UserShow'


function App() {
  // Checking if the user is signed in and grab user ID from localStorage
  const isUserSignedIn = !!localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user/signup" element={<SignUp />} />
      </Routes>

      <TopTab />
      
      <BottomTab />

    </div>
  )
}

export default App


