import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer';
import AllRoom from './pages/AllRoom';
import RoomDetail from './pages/RoomDetail';


function App() {

  const isOwner = useLocation().pathname.includes('owner');
  return (
    <>
      {!isOwner && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRoom />} />
          <Route path='/rooms/:id' element={<RoomDetail />} />

        </Routes>
      </div>
      <Footer />
    </>


  )
}

export default App
