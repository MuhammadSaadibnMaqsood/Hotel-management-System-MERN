import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'

const Hero = () => {
  const { axios, getToken, navigate, setrecentSearchCities, recentSearchCities } = useAppContext();
  const [Destination, setDestination] = useState('')

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${Destination}`);

    // await axios.post('/api/user/stored-recent-search', { recentSearchCities }, { headers: { Authorization: `Bearer ${await getToken()}` } });


    setrecentSearchCities((prev) => {
      const updated = [...prev, Destination];
      if (updated.length > 3) {
        updated.shift();
      }
      return updated;
    })
  }
  return (
    <div
      className='h-screen bg-no-repeat bg-center bg-cover w-full relative overflow-hidden
  bg-[url("https://npr.brightspotcdn.com/dims4/default/715e4fa/2147483647/strip/true/crop/800x611+0+0/resize/880x672!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkcur%2Ffiles%2F201810%2FCrossroads-Hotel-XR.jpg")]'
    >
      <div className='bg-black h-[90%] w-[100%] rotate-50 absolute bottom-0 left-56 text-white transform -translate-x-1/2 smallscreen'>

      </div>
      <div className='text-white relative z-10 top-80 heroDiv'>
        <p className="heroSubheading text-2xl bg-blue-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition duration-500 ease-in-out shadow-white w-80 p-2.5 rounded-2xl ml-7 text-center opacity-80 backdrop-blur-sm tracking-wide">
          Ultimate Hotel Experience
        </p>

        <h1 className='mainheading my-12 Tektur ml-4 w-[550px] text-center text-5xl animate-fade-in-slow tracking-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]'>
          Discover your perfect Gate way Destination
        </h1>
        <p className='w-[550px] ml-7 transition duration-500 ease-in-out animate-fade-in-slow tracking-tight disc'>
          unparallel luxury and comfort await await at the world most exclusive hotel and resort. Start your journey today.
        </p>
        <div className='bg-white w-[800px] m-7 rounded-2xl formDiv'>
          <form onSubmit={onSearch} className='flex flex-wrap'>
            <div className='p-4 text-black'>
              <label className='text-black flex gap-2 items-center m-2 text-[17px]' htmlFor="destination">
                <img src={`${assets.calenderIcon}`} alt="calendericon" /> Destination
              </label>

              <input
                onChange={e => setDestination(e.target.value)}
                value={Destination}
                type="text"
                id="destination"
                name="destination"
                list="destination-options"
                className="text-black p-2 rounded-[10px]"
                placeholder="Type here..."
              />

              <datalist id="destination-options">
                <option value="Karachi" />
                <option value="Lahore" />
                <option value="Islamabad" />
                <option value="Murree" />
                <option value="Hunza Valley" />
                <option value="Skardu" />
              </datalist>
            </div>
            <div className='p-4 text-black '>

              <label className='text-black flex gap-2 items-center m-2 text-[17px]' htmlFor="checkIn"><img src={`${assets.calenderIcon}`} alt="calendericon" /> checkIn</label>
              <input type="date" id='checkIn' className='text-black p-2 rounded-[10px]' name='checkIn' htmlFor="checkIn" />
            </div>
            <div className='p-4 text-black'>

              <label className='text-black flex gap-2 items-center m-2 text-[17px]' htmlFor="checkOut"><img src={`${assets.calenderIcon}`} alt="calendericon" /> checkOut</label>
              <input type="date" id='checkOut' className='text-black p-2 rounded-[10px]' name='checkOut' htmlFor="checkOut" />
            </div>
            <div className='p-4 text-black'>

              <label className='text-black flex gap-2 items-center m-2 text-[17px]' htmlFor="guest"> Guest</label>
              <input type="number" max={1} min={6} id='guest' className='text-black p-2 rounded-[10px]' placeholder='0' name='guest' htmlFor="guest" />
            </div>
            <div className='p-4 text-black '>
              <button type="submit" className="text-white flex items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  text-sm px-6 py-2.5 rounded-full  transition-all duration-500 text-center me-2 mb-2 mt-1.5">
                <img src={assets.searchIcon} alt="" />Search</button>
            </div>

          </form>

        </div>
      </div>
    </div >

  )
}

export default Hero
