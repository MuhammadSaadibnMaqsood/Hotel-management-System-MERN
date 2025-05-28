import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {
  const [images, setimages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })
  const [input, setinput] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false
    }
  })

  return (
    <form className='bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto my-8'>
      <Title
        align={'left'}
        title={'Add Room'}
        subTitle={'Fill in the details carefully to enhance the booking experience with accurate room info, pricing, and amenities.'}
      />

      {/* Image Upload Area */}
      <p className='text-gray-800 font-semibold mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-4 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key} className='cursor-pointer'>
            <img
              className='h-32 w-32 object-cover rounded-lg border-2 border-dashed border-blue-400 hover:opacity-80 transition'
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt={`upload-${key}`}
            />
            <input
              type="file"
              accept='image/*'
              id={`roomImage${key}`}
              hidden
              onChange={e => setimages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>

      {/* Room Type and Price */}
      <div className='w-full flex flex-col sm:flex-row sm:gap-6 mt-6'>
        <div className='flex-1'>
          <p className='text-gray-800 font-semibold'>Room Type</p>
          <select
            value={input.roomType}
            onChange={e => setinput({ ...input, roomType: e.target.value })}
            className='border border-gray-300 mt-1 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suites">Family Suites</option>
          </select>
        </div>
        <div className='mt-4 sm:mt-0'>
          <p className='text-gray-800 font-semibold'>Price <span className='text-sm text-gray-500'>/night</span></p>
          <input
            type="number"
            placeholder='0'
            value={input.pricePerNight}
            onChange={e => setinput({ ...input, pricePerNight: e.target.value })}
            className='border border-gray-300 mt-1 rounded-lg p-2 w-32 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          />
        </div>
      </div>

      {/* Amenities */}
      <p className='text-gray-800 font-semibold mt-6'>Amenities</p>
      <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-2 text-gray-700'>
        {Object.keys(input.amenities).map((amenity, index) => (
          <label key={index} className='flex items-center gap-2'>
            <input
              type="checkbox"
              checked={input.amenities[amenity]}
              onChange={() => setinput({ ...input, amenities: { ...input.amenities, [amenity]: !input.amenities[amenity] } })}
              className='accent-blue-600 h-4 w-4'
            />
            <span>{amenity}</span>
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className='mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition transform hover:scale-105'
      >
        Add Room
      </button>
    </form>
  )
}

export default AddRoom
