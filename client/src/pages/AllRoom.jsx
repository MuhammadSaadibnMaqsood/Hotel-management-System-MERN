import React from 'react'
import Title from '../components/Title'
import HotelCard from '../components/HotelCard'
import { roomsDummyData } from '../assets/assets'

const AllRoom = () => {
    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* rooms */}
            <div>
                <div>
                    <Title title={'Hotel Rooms'} subTitle={'Take advantage of our limited-time offers and special packages to enhance your stay and create unforgetable memproes'} align={'left'} />
                </div>
                <div>
                  
                    <div className='flex  flex-wrap items-center justify-center gap-6 mt-20'>
                        {roomsDummyData.map((room, index) => (

                            <HotelCard key={room._id} room={room} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            {/* filters */}
            <div>

            </div>
        </div>
    )
}

export default AllRoom