import React, { useState, useContext, useEffect } from 'react'
import Title from '../components/Title'
import HotelCard from '../components/HotelCard'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { HotelContext } from "../Context/HotelContext";


const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm hover:text-blue-600 transition'>
            <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm hover:text-blue-600 transition'>
            <input name='sortOption' type="radio" checked={selected} onChange={() => onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRoom = () => {
    const navigate = useNavigate();
    const [openFilters, setopenFilters] = useState(false);
    const [FilterRoom, setFilterRoom] = useState([])
    const { search, setsearch } = useContext(HotelContext);



    const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Bed', 'Family Suite'];
    const priceRange = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
    const sortOption = ['Price Low to High', 'Price High to Low', 'Newest First'];

    useEffect(() => {
      setFilterRoom(roomsDummyData);
    }, [])
    

    const handleChange = (e) => {
        const str = e.target.value.toLowerCase();

        const filter = roomsDummyData.filter(item => item.hotel.name.toLowerCase().includes(str))
        setFilterRoom(filter);



    }


    return (
        <>
            {search && (
                <div className='pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
                    <input
                        type="text"
                        placeholder='Search'
                        className='bg-white w-full max-w-md border border-gray-300 text-gray-600 rounded-xl shadow-md py-4 px-4 text-lg'
                        onChange={handleChange}
                    />
                </div>
            )}

            <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>


                {/* rooms */}
                <div className='w-full lg:w-3/4'>
                    <Title
                        title={'Hotel Rooms'}
                        subTitle={'Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories'}
                        align={'left'}
                    />
                    <div>
                        {FilterRoom.map((room) => (
                            <div key={room._id} className='group transition-all duration-300 hover:shadow-xl hover:bg-white flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0 rounded-xl'>

                                <img onClick={() => { navigate(`${room._id}`); scrollTo(0, 0); }}
                                    src={room.images[0]} alt="room img"
                                    className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105'
                                    title='View room detail' />

                                <div className='md:w-1/2 flex flex-col gap-2'>
                                    <p className='text-gray-500'>{room.hotel.city}</p>
                                    <p onClick={() => { navigate(`${room._id}`); scrollTo(0, 0); }}
                                        className='text-gray-800 text-2xl font-semibold cursor-pointer hover:underline'>{room.hotel.name}</p>

                                    <div className='flex items-center'>
                                        <StarRating />
                                        <p className='ml-2 text-sm text-gray-600'>200+ reviews</p>
                                    </div>

                                    <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                                        <img src={assets.locationIcon} alt="location icon" />
                                        <span>{room.hotel.address}</span>
                                    </div>

                                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-3'>
                                        {room.amenities.map((item, index) => (
                                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-full bg-[#EEF2FF] text-gray-700 shadow-sm hover:shadow-md transition'>
                                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                                <p className='text-xs'>{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className='text-xl font-semibold text-blue-700 mt-2'>
                                        ${room.pricePerNight} <span className="text-gray-500 font-normal text-sm">/night</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* filters */}
                <div className='bg-white w-full lg:w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16 rounded-xl shadow-md'>
                    <div className={`flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50 ${openFilters && "border-b"}`}>
                        <p className='text-base font-semibold text-gray-800 tracking-wide'>FILTERS</p>
                        <div className='text-sm cursor-pointer font-medium text-blue-600 hover:underline transition'>
                            <span onClick={() => setopenFilters(!openFilters)} className='lg:hidden'>{openFilters ? 'HIDE' : 'SHOW'}</span>
                            <span className='hidden lg:block'>CLEAR</span>
                        </div>
                    </div>

                    <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                        <div className='px-5 pt-5'>
                            <p className='font-semibold text-gray-800 pb-2 border-b border-gray-100 mb-3'>Popular filters</p>
                            {roomTypes.map((room, index) => (
                                <CheckBox key={index} label={room} />
                            ))}
                        </div>

                        <div className='px-5 pt-5'>
                            <p className='font-semibold text-gray-800 pb-2 border-b border-gray-100 mb-3'>Price Range</p>
                            {priceRange.map((range, index) => (
                                <CheckBox key={index} label={`$ ${range}`} />
                            ))}
                        </div>

                        <div className='px-5 pt-5 pb-7'>
                            <p className='font-semibold text-gray-800 pb-2 border-b border-gray-100 mb-3'>Sort by</p>
                            {sortOption.map((option, index) => (
                                <RadioButton key={index} label={option} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllRoom
