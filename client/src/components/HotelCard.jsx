import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      className='relative group rounded-xl overflow-hidden bg-white text-gray-700 shadow-md hover:shadow-xl transition-all duration-300'
    >
      {/* Image with zoom on hover */}
      <div className='overflow-hidden'>
        <img
          src={room.images[0]}
          alt='room'
          className='h-60 w-full object-cover transform group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      {/* Best Seller badge */}
      {index % 2 === 0 && (
        <p className='absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full shadow-md'>
          Best Seller
        </p>
      )}

      {/* Card Content */}
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold text-gray-800'>{room.hotel.name}</p>
          <div className='flex items-center gap-1 text-yellow-500 font-medium'>
            <img src={assets.starIconFilled} alt='star icon' className='h-4 w-4' />
            4.5
          </div>
        </div>

        <div className='flex items-center gap-1 text-sm mt-1 text-gray-500'>
          <img src={assets.locationIcon} alt='location icon' className='h-4 w-4' />
          <span>{room.hotel.address}</span>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <p>
            <span className='text-xl font-semibold text-gray-800'>${room.pricePerNight}</span>
            <span className='text-sm text-gray-500'> /night</span>
          </p>
          <button
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg'
          >
            Book Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
