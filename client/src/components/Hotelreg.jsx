import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import { useState } from 'react';
import toast from 'react-hot-toast';

const Hotelreg = () => {

    const { setshowHotelReg, getToken, axios, setIsOwner } = useAppContext();
    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    const [contact, setcontact] = useState('')
    const [city, setcity] = useState('')

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const {data} = await axios.post('/api/hotels',{name,address,contact,city},{headers:{Authorization: `Bearer ${await getToken()}`}})

            console.log(data);

            if (data.success) {
                toast.success(data.message)
                setIsOwner(true);
                setshowHotelReg(false);
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className='relative flex bg-white rounded-2xl max-w-4xl w-full mx-4 shadow-lg overflow-hidden animate-fadeIn'>
                {/* Close Icon */}
                <img onClick={() => setshowHotelReg(false)}
                    src={assets.closeIcon}
                    alt="close icon"
                    className='absolute top-4 right-4 h-6 w-6 cursor-pointer hover:scale-110 transition-transform duration-300'
                />

                {/* Left Side Image */}
                <img
                    src={assets.regImage}
                    alt="registration"
                    className='w-1/2 hidden md:block object-cover'
                />

                {/* Right Side Content */}
                <div className='flex flex-col items-center justify-center md:w-1/2 p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-blue-100'>
                    <p className='text-2xl md:text-3xl font-bold text-blue-800 mb-4'>Register Your Hotel</p>

                    <input
                        required
                        onChange={(e) => setname(e.target.value)}
                        value={name}
                        id='name'
                        type='text'
                        placeholder='Hotel Name'
                        className='w-full p-3 rounded-lg border border-gray-300 mb-3 focus:ring-2 focus:ring-blue-400 outline-none'
                    />
                    <input
                        required
                        onChange={(e) => setaddress(e.target.value)}
                        value={address}
                        id='Address'
                        type='text'
                        placeholder='Address'
                        className='w-full p-3 rounded-lg border border-gray-300 mb-3 focus:ring-2 focus:ring-blue-400 outline-none'
                    />
                    <input
                        required
                        onChange={(e) => setcontact(e.target.value)}
                        value={contact}
                        id='phone'
                        type='number'
                        placeholder='phone'
                        className='w-full p-3 rounded-lg border border-gray-300 mb-3 focus:ring-2 focus:ring-blue-400 outline-none'
                    />
                    <input
                        required
                        onChange={(e) => setcity(e.target.value)}
                        value={city}
                        id='city'
                        type='text'
                        placeholder='City'
                        className='w-full p-3 rounded-lg border border-gray-300 mb-3 focus:ring-2 focus:ring-blue-400 outline-none'
                    />
                    <button
                        type='submit'
                        className='w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300'
                    >
                        Register Now
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Hotelreg
