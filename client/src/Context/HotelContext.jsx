import { createContext } from "react";
import { useState } from "react";

export const HotelContext = createContext();

const HotelContextProvider = ({ children }) => {

    const [search, setsearch] = useState(false);


    const contextValue = {

        search,
        setsearch,

    };



    return (
        <HotelContext.Provider value={contextValue}>
            {children}
        </HotelContext.Provider>
    );
};

export default HotelContextProvider;
