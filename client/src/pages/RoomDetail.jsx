import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const foundRoom = roomsDummyData.find((room) => room._id === id);
        if (foundRoom) {
            setRoom(foundRoom);
            setMainImage(foundRoom.images[0]);
        }
    }, [id]);

    return (
        <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 py-10">
            {room ? (
                <div>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                        <h1 className="text-3xl font-semibold mb-4">{room.hotel.name} <span className='text-sm'>({room.roomType})</span></h1>
                        <p className='text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
                    </div>
                    <div className='flex items-center gap-1 mt-2'>
                        <StarRating />
                        <p className='ml-2'>200+ reviews</p>
                    </div>
                    <img
                        src={mainImage}
                        alt="Main Room"
                        className="w-full md:w-1/2 max-h-[400px] object-cover rounded-xl mb-4"
                    />
                    <div className="flex gap-4 mb-6 overflow-x-auto">
                        {room.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Room ${idx}`}
                                className={`w-32 h-24 object-cover rounded cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'
                                    }`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                    <div className='flex flex-row gap-2'>
                        <img src={assets.locationIcon} alt="location icon" />
                        <p className="text-gray-600">{room.hotel.city}, {room.hotel.address}</p>
                    </div>
                    <p className="mt-4 text-xl font-medium text-blue-700">${room.pricePerNight} / night</p>
                </div>
            ) : (
                <p className="text-gray-600">Loading room details...</p>
            )}

            {/* Room HightLight  */}

            {room && (<div className='flex flex-col md:flex-row md:justify-between mt-10'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl'>Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt="item" className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>

                            </div>
                        ))}
                    </div>
                </div>


            </div>
            )}

            {/* checkIn checkOut form  */}
            <form className='flex flex-col md:flex-row items-start mb-10 md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl' >
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className='flex flex-col'>
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input type="date" id='checkInDate' placeholder='check-In'
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />

                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input type="date" id='checkOutDate' placeholder='check-Out'
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />

                    </div>
                    <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                    <div className='flex flex-col'>
                        <label htmlFor="guest" className='font-medium'>Guest</label>
                        <input type="number" id='Guest' placeholder='0'
                            className='max-w-20  rounded border border-gray-300 px-3 py-2  mt-1.5 outline-none' required />

                    </div>
                </div>
                <button type="submit" className="  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-8 py-2.5 rounded-full transition-all duration-500 text-center me-2 mb-2 mt-4 md:mt-0">
                    Check Avaibility</button>
            </form>

            {/* common specification  */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <img src={spec.icon} alt="spec icon" className='w-6.5' />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>

                    </div>
                ))}
            </div>
            <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
                <p>"Guests are allocated on the ground floor based on availability. You’ll enjoy the comfort of a two-bedroom apartment that offers a true city living experience.
                    With a relaxing and welcoming atmosphere, this accommodation ensures a peaceful and satisfying stay

                </p>
            </div>

            {/* owner detail  */}

            { room && <div className='flex flex-col items-start gap-4'>
                <div className='flex gap-4'>
                 
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>

            </div>}
              <button type="submit" className="  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-8 py-2.5 rounded-full transition-all duration-500 text-center me-2 mb-2 mt-4 md:mt-0">
                  Contact now</button>
        </div>
    );
};

export default RoomDetail;
