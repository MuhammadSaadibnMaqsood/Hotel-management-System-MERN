import Room from "../models/Room.js";
import Hotel from "../models/hotel.js";
import { v2 as cloudinary } from 'cloudinary'


// CREATE ROOM
export const createRoom = async (req, res) => {
    try {

        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }
        //checking files

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images uploaded' });
        }
        //uploading images to cloudinary 
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);


            return response.secure_url;
        });


        // wait from all upload
        const images = await Promise.all(uploadImages)

        //create room
        await Room.create({
            hotel: hotel._id,
            roomType: roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        });

        res.status(200).json({ success: true, message: 'Room created' });

    } catch (error) {

        console.error(error.message)
        res.status(500).json({ success: false, message: 'Internal server error' });

    }

}

// function to get all room

const getRoom = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'

            }
        }).sort({ createdAt: -1 })

        if (rooms.length === 0) {
            return res.status(404).json({ success: false, message: 'No room available' });
        }

        return res.status(200).json({ success: true, rooms });


    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// function to get room to a spicfic hotel 

const getOwnerRoom = async (req, res) => {
    try {
        const hotelData = await Hotel.find({ owner: req.auth.userId });

        if (hotelData === 0) {
            return res.status(404).json({ success: false, message: 'No Owner found' });
        }

        const room = await Room.find({ hotel: hotelData._id }).populate('hotel');

        if (room === 0) {
            return res.status(404).json({ success: false, message: 'No room available' });

        }

        return res.status(200).json({ success: true, room });



    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// function to toggle room availability

const toggleRoomAvaibility = async (req, res) => {
    try {
        const { roomID } = req.body;

        if (!roomID) {
            return res.status(400).json({ success: false, messsage: 'kindly provide room id' });
        }

        const roomData = await Room.findById(roomID);

        if (!roomData) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();

        return res.status(200).json({ success: true, message: 'Avaibility changed' });

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}