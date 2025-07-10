import React from 'react'
import Navbar from '../../components/HotelOwner/Navbar'
import SideBar from '../../components/HotelOwner/SideBar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { useEffect } from 'react'
// import Footer from '../../components/Footer'

const Layout = () => {

  const {isOwner,navigate} = useAppContext();

  useEffect(()=>{
    if (!isOwner) {
      navigate('/');
    }
  },[isOwner])
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex h-full'> 
          <SideBar/>
          <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
            <Outlet/>
          </div>
        </div>

         {/* <Footer /> */}
    </div>
  )
}

export default Layout