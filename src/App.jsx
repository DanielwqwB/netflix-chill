import React from 'react'
import Home from './pages/Home/Home.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>     
    </div>
  )
}

export default App
