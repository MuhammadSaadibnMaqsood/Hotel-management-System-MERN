import React, { useEffect, useState } from 'react'
// import { roomsDummyData } from '../../assets/assets'
import { useAppContext } from '../../Context/AppContext'

import Title from '../../components/Title'
import toast from 'react-hot-toast';

const ListRoom = () => {
  const [rooms, setrooms] = useState([]);
  const { axios, getToken, user } = useAppContext();

  //toogle avaibility

  const toggleAvaibility = async (roomID) => {
    try {

      // console.log(roomID);
      

      const { data } = await axios.post('/api/rooms/toggle-avaibility', { roomID }, { headers: { Authorization: `Bearer ${await getToken()}` } });
      console.log(data);
      
      if (data.success === true) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);

      console.log(error.message);
    }
  }


  // fetching rooms

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', { headers: { Authorization: `Bearer ${await getToken()}` } });
      // console.log(data);

      if (data.success === true) {
        setrooms(data.room);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(data.message);

      console.log(error.message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div className='p-4'>
      <Title align={'left'} title={'Room Listing'} subTitle={'Browse all available rooms and their details.'} />

      <p className='text-gray-600 mt-8 font-medium'>All Rooms</p>
      <div className='mt-4 w-full max-w-5xl text-left border border-gray-300 rounded-xl max-h-96 overflow-y-auto shadow-md hover:shadow-lg transition-shadow duration-300'>
        <table className='w-full table-auto'>
          <thead className='bg-gradient-to-r from-blue-100 via-white to-blue-50'>
            <tr>
              <th className='py-3 px-4 text-blue-900 font-semibold text-xs uppercase tracking-wide'>Name</th>
              <th className='max-sm:hidden py-3 px-4 text-blue-900 font-semibold text-xs uppercase tracking-wide'>Amenities</th>
              <th className='py-3 px-4 text-blue-900 font-semibold text-xs uppercase tracking-wide'>Price/Night</th>
              <th className='py-3 px-4 text-blue-900 font-semibold text-xs uppercase tracking-wide text-center'>Available</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {rooms.map((item, index) => (
              <tr key={index} className='hover:bg-blue-50 transition-colors duration-200'>
                <td className='py-3 px-4 text-gray-800 border-t border-gray-200'>{item.roomType}</td>
                <td className='max-sm:hidden py-3 px-4 text-gray-700 border-t border-gray-200'>{item.amenities.join(', ')}</td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-200'>${item.pricePerNight}</td>
                <td className='py-3 px-4 border-t border-gray-200 text-center'>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input onClick={() => toggleAvaibility(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable} readOnly />
                    <div className='w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-400 peer-focus:ring-4 peer-focus:ring-green-200 transition-all duration-300'></div>
                    <div className='absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5'></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListRoom
