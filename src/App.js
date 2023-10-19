import { Routes, Route } from 'react-router-dom'
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
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
    <div className="App">

      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        {isUserSignedIn && <Route path='/user' element={<UserShow />} /> }
      </Routes>

      <TopTab />
      <BottomTab />

    </div>
  )
  
}

export default App

