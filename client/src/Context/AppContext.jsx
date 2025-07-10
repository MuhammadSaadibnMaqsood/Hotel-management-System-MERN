import axios from 'axios'
import { Children, createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || '$'
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setshowHotelReg] = useState(false);
    const [recentSearchCities, setrecentSearchCities] = useState([]);
    const [rooms, setRooms] = useState([]);


    const fetchRoom = async () => {
        try {
            const { data } = await axios.get('/api/rooms');
            // console.log(data);
            

            if (data.success) {
                setRooms(data.rooms);


            } else {
                console.log(data.message);
                toast.error(data.message)

            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
            // console.log('I am a room error');

        }
    }

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } });
            // console.log('Fetched role:', data.role);

            // console.log(data);
            


            if (data.success) {
                if (data.role === 'hotelOwner') {

                    setIsOwner(true);
                }
                setrecentSearchCities(data.recentSearchCities);
            } else {
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }


        } catch (error) {
            console.error(error.message);
            toast.error(error.message)

        }

    }
    // USEEFFECT TO FETCH USER
    useEffect(() => {
        if (user) {
            fetchUser();
        }

     
        
    }, [user]);

    //USEEFFECT TO FETCH 
    useEffect(() => {

        fetchRoom();
        // console.log(rooms);

    }, []);

    // console.log(isOwner);




    const value = {
        currency,
        navigate,
        isOwner,
        setIsOwner,
        showHotelReg,
        user,
        getToken,
        axios,
        recentSearchCities,
        setrecentSearchCities,
        setshowHotelReg,
        rooms,
        setRooms
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);