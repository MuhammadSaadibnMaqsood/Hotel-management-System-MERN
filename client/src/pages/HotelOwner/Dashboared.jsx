import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { dashboardDummyData } from '../../assets/assets'
import { tr } from 'framer-motion/client'

const Dashboared = () => {
    const [DashboardData, setDashboardData] = useState(dashboardDummyData)

    return (
        <div>
            <Title align={'left'} title={'Dashboard'} subTitle={'Monitor room listing, track bookings and analyze revenue-all in one place. Stay updated with real time insights to ensure smooth operation'} />
            <div className='flex gap-4 my-8'>
                {/* Total bookings  */}
                <div className='bg-gradient-to-r from-blue-50 via-white to-blue-100 border border-blue-200 rounded-xl shadow-md flex p-4 pr-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105'>
                    <img src={assets.totalBookingIcon} alt="total booking icon" className='max-sm:hidden h-10 opacity-80' />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-blue-600 text-lg font-semibold tracking-wide'>Total Bookings</p>
                        <p className='text-gray-600 text-base'>{DashboardData.totalBookings}</p>
                    </div>
                </div>

                {/* Total revenue  */}
                <div className='bg-gradient-to-r from-blue-50 via-white to-blue-100 border border-blue-200 rounded-xl shadow-md flex p-4 pr-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105'>
                    <img src={assets.totalRevenueIcon} alt="total revenue icon" className='max-sm:hidden h-10 opacity-80' />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-blue-600 text-lg font-semibold tracking-wide'>Total Revenue</p>
                        <p className='text-gray-600 text-base'>$ {DashboardData.totalRevenue}</p>
                    </div>
                </div>
            </div>
            {/* recent bookings  */}
            <h2 className='text-xl text-blue-950/80 font-semibold mb-5 tracking-wide'>Recent Bookings</h2>
            <div className='w-full max-w-3xl text-left border border-gray-200 rounded-xl max-h-80 overflow-y-scroll shadow-md hover:shadow-lg transition-shadow duration-300'>
                <table className='w-full table-auto border-collapse'>
                    <thead className='bg-gradient-to-r from-blue-50 to-white'>
                        <tr>
                            <th className='py-3 px-4 text-blue-800 font-semibold text-sm uppercase tracking-wider'>User Name</th>
                            <th className='max-sm:hidden py-3 px-4 text-blue-800 font-semibold text-sm uppercase tracking-wider'>Room Name</th>
                            <th className='py-3 px-4 text-blue-800 font-semibold text-sm uppercase tracking-wider text-center'>Total Amount</th>
                            <th className='py-3 px-4 text-blue-800 font-semibold text-sm uppercase tracking-wider text-center'>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm divide-y divide-gray-200'>
                        {DashboardData.bookings.map((item, index) => (
                            <tr key={index} className='hover:bg-blue-50/30 transition-colors duration-200'>
                                <td className='py-3 px-4 text-gray-700'>{item.user.username}</td>
                                <td className='py-3 px-4 text-gray-700 max-sm:hidden'>{item.room.roomType}</td>
                                <td className='py-3 px-4 text-gray-700 text-center'>$ {item.totalPrice}</td>
                                <td className='py-3 px-4 text-center'>
                                    <span className={`inline-block py-1 px-3 text-xs font-medium rounded-full ${item.isPaid ? 'bg-green-200 text-green-800' : 'bg-amber-200 text-yellow-800'} shadow-sm`}>
                                        {item.isPaid ? 'Completed' : 'Pending'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashboared