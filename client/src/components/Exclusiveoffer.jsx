import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'
import { div } from 'framer-motion/client'

const Exclusiveoffer = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center m-6 gap-4 mx-12'>
                <Title
                    title='Exclusive Offer'
                    subTitle='Take advantage of our limited-time offers or special packages to enhance your stay and create unforgettable memories'
                    align='left'
                />

                <div className='flex items-center group space-x-2'>
                    <button
                        className='text-sm font-medium px-4 py-2 border border-gray-300 rounded-lg
                 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500
                 hover:text-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-md'
                    >
                        View All Offers
                    </button>

                    <img
                        src={assets.arrowIcon}
                        alt="arrow Icon"
                        className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mx-12'>
                {exclusiveOffers.map((item) => (
                    <div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center'
                        style={{ background: `url(${item.image})` }}>
                        <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>{item.priceOff} %OFF</p>
                        <div>
                            <p className='text-2xl font-medium'>{item.title}</p>
                            <p >{item.description}</p>
                            <p className='text-xs text-white/70 mt-3'>Expires: {item.expiryDate}</p>
                        </div>
                        <button className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5'>View offers
                            <img className='invert group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="arrow icon" />
                        </button>
                    </div>

                ))}
            </div>
        </>


    )
}

export default Exclusiveoffer