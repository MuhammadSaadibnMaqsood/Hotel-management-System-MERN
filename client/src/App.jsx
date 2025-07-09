import { useContext, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer';
import AllRoom from './pages/AllRoom';
import RoomDetail from './pages/RoomDetail';
import MyBookings from './pages/MyBookings';
import Hotelreg from './components/Hotelreg';
import Layout from './pages/HotelOwner/Layout';
import Dashboared from './pages/HotelOwner/Dashboared';
import AddRoom from './pages/HotelOwner/AddRoom';
import ListRoom from './pages/HotelOwner/ListRoom';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './Context/AppContext';
import { Loader } from './components/Loader';

function App() {

  const isOwner = useLocation().pathname.includes('owner');
  const { showHotelReg } = useAppContext();
  return (
    <>
      <Toaster />
      {!isOwner && <Navbar />}
      {showHotelReg && < Hotelreg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRoom />} />
          <Route path='/rooms/:id' element={<RoomDetail />} />
          <Route path='/myBookings' element={<MyBookings />} />
          <Route path='/loader/:nextUrl' element={<Loader />} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboared />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>


  )
}

export default App
