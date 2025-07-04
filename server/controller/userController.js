import User from "../models/user.js";


//GET USER DATA

export const getUserData = async (req, res) => {
    try {

        const role = req.user.role;
        const recentSearchCities = req.user.recentSearchCities;

        return res.status(200).json({ success: true, role, recentSearchCities });

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({ success: false, message: 'internal server error' })
    }

}

//  STORE USER RECENT SEARCH CITIES
export const storeUserSearchCities = async (req, res) => {
    try {
        const { recentSearchCities } = req.body;
        const user = req.user;

        if (!recentSearchCities || typeof recentSearchCities !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid city input' });
        }

        if (user.recentSearchCities.length < 3) {
            user.recentSearchCities.push(recentSearchCities);
        } else {
            user.recentSearchCities.shift();
            user.recentSearchCities.push(recentSearchCities);
        }

        await user.save();

        return res.status(200).json({ success: true, message: 'Recent search cities updated' });
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

