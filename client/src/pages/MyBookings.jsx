import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const MyBookings = () => {
    const [Bookings, setBookings] = useState([]);
    const { user, getToken, axios } = useAppContext();
    const fetchData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/user', { headers: { Authorization: `Bearer ${await getToken()}` } });

            // console.log(data);

            if (data.success) {
                setBookings(data.Bookings);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {

        fetchData();
        // console.log(Bookings);

    }, [user]);

    const handlePayment = async (bookingId) => {
        try {
            const { data } = await axios.post('/api/bookings/stripe-payment', { bookingId }, { headers: { Authorization: `Bearer ${await getToken()}` } })

            if (data.success) {
                window.location.href = data.url;
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }
    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-blue-50 via-white to-gray-50 min-h-screen'>
            <Title title={'My Bookings'} subTitle={'Easily manage your past, current, or future reservations. Plan your trips seamlessly with just a few clicks.'} align={'left'} />
            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-semibold text-lg py-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-lg shadow'>
                    <div className='w-full'>Hotels</div>
                    <div className='w-full'>Date & Timings</div>
                    <div className='w-full'>Payment</div>
                </div>
                {Bookings.map((booking) => (
                    <div key={booking._id} className="w-full border-b border-gray-200 py-4 hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg my-4">
                        <div className="md:grid md:grid-cols-[3fr_2fr_1fr] gap-4 p-4">
                            {/* Hotel detail */}
                            <div className="flex flex-col md:flex-row items-start">
                                <img
                                    className="w-full md:w-44 h-44 rounded-lg shadow-md object-cover transform hover:scale-105 transition-transform duration-300"
                                    src={booking.room.images[0]}
                                    alt="Hotel"
                                />
                                <div className="flex flex-col gap-1.5 max-md:mt-3 md:ml-4">
                                    <p className="text-xl font-bold text-blue-800">
                                        {booking.hotel.name}
                                        <span className="text-sm text-blue-500"> ({booking.room.roomType})</span>
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <img src={assets.locationIcon} alt="location" className="h-4 w-4" />
                                        <span>{booking.hotel.address}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                        <img src={assets.guestsIcon} alt="guests" className="h-4 w-4" />
                                        <span>{booking.guests} guest({`${booking.guest}`})</span>
                                    </div>
                                    <p className="text-base font-medium text-green-600">Total: ${booking.totalPrice}</p>
                                </div>
                            </div>

                            {/* Date and timings */}
                            <div className="flex flex-col gap-3 mt-3 md:mt-0">
                                <div>
                                    <p className="font-medium text-gray-700">Check-In</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(booking.checkInDate).toDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">Check-Out</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(booking.checkOutDate).toDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Payment status */}
                            <div className="flex flex-col items-start md:items-center justify-center gap-3 mt-3 md:mt-0">
                                <div className='flex items-center gap-2'>
                                    <span className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></span>
                                    <span className={`text-sm font-semibold ${booking.isPaid ? "text-green-600" : "text-red-600"}`}>
                                        {booking.isPaid ? "PAID" : "UNPAID"}
                                    </span>
                                </div>
                                {!booking.isPaid && (
                                    <button onClick={()=>handlePayment(booking._id)} className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-md shadow hover:from-red-600 hover:to-pink-600 transition-all">
                                        Pay Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings
