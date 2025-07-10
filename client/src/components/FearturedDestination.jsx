import React, { useEffect } from 'react'
import HotelCard from './HotelCard'
// import { roomsDummyData } from '../assets/assets'
import Title from './Title'
// import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext'



const FearturedDestination = () => {

    const {rooms,navigate} = useAppContext();
  
    return rooms.length > 0 &&  (
        <>
            <div className='mt-20'><Title title={'Feartured Destination'} subTitle={'Discover our handpicked selection of exceptional propertise around the world, offering unparalled luxury and unforgetable experience.'} />
            </div>
            <div className='flex  flex-wrap items-center justify-center gap-6 mt-20'>
                {rooms.slice(0, 4).map((room, index) => (

                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>

            <div className='flex items-center justify-center'>
                <button
                    onClick={() => {
                        navigate('/rooms')
                        scrollTo(0, 0)
                    }}
                    className='my-14 px-6 py-2 text-sm font-semibold border border-gray-300 rounded-lg 
               bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out 
               hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 
               hover:text-white cursor-pointer'
                >
                    View All Hotel
                </button>
            </div>
        </>
    )
}

export default FearturedDestination