import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'


function App() {

  const isOwner = useLocation().pathname.includes('owner');
  return (
   <>
   {!isOwner && <Navbar/>}
   
   <Routes>
        <Route path='/' element={<Home />} />
       
      </Routes>
   
   </>
  )
}

export default App
