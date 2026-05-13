import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>

    
    </Routes>
    </>
  )
}

export default App
