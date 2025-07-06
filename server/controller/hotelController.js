import Hotel from "../models/hotel.js";
import User from "../models/user.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const user = req.user._id;

    // Check if this user already has a hotel

    const existingHotel = await Hotel.findOne({ owner: user });
    if (existingHotel) {
      return res.status(400).json({ success: false, message: 'Hotel already exists for this user' });
    }

    // Create the hotel
    await Hotel.create({ name, address, contact, city, owner: user });

    // Update user role
    await User.findByIdAndUpdate(user, { role: 'hotelOwner' });

    return res.status(200).json({ success: true, message: 'Hotel registered successfully' });
    
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
