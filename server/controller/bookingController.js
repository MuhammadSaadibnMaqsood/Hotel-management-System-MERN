// Function to check avaibility

import transporter from "../configs/nodemailer.js";
import Booking from "../models/booking.js"
import Room from "../models/Room.js";
import Hotel from "../models/Room.js";
import stripe from 'stripe'

const checkAvaibility = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const booking = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate }
        });

        const isAvailable = booking.length === 0;

        return isAvailable;

    } catch (error) {
        console.error(error.message);
    }
}


export const checkAvaibilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;

        const isAvailable = await checkAvaibility({ room, checkInDate, checkOutDate });

        return res.status(200).json({ success: true, isAvailable });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });

    }
}

export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;

        const user = req.user._id;

        // check room avaibility 

        const isAvailable = await checkAvaibility({ room, checkInDate, checkOutDate });

        if (!isAvailable) {
            return res.status(400).json({ success: false, message: 'Room is already booked' });

        }

        const roomData = await Room.findById(room).populate('hotel');
        let totalPrice = roomData.pricePerNight;

        //count Totalprice

        let checkIn = new Date(checkInDate);
        let checkOut = new Date(checkOutDate);
        let timeDiff = checkOut.getTime() - checkIn.getTime();

        let night = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= night;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            checkInDate,
            checkOutDate,
            guest: +guests,
            totalPrice: totalPrice

        })


        return res.status(200).json({ success: true, message: 'Room Booked' });


    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Failed to create booking' });
    }
}

// get all booking of a user

export const getUserBookings = async (req, res) => {
    try {

        const user = req.user._id;

        const Bookings = await Booking.find({ user }).populate('room hotel').sort({ createdAt: -1 })

        if (!Bookings || Bookings.length === 0) {
            return res.status(200).json({ success: true, Bookings: [] });
        } else {
            return res.status(200).json({ success: true, Bookings });

        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// get hotel bookings 

export const getHotelBooking = async (req, res) => {
    try {
        //find hotel first by userID
        const hotel = await Hotel.findOne({ owner: req.auth._id });
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'No hotel found' });
        }
        //finding bookings using hotel id
        console.log(hotel._id);
        
        const bookings = await Booking.find({ hotel: hotel._id }).populate('room hotel user').sort({ createdAt: -1 });

        console.log(bookings);
        
        //total booking
        const totalBookings = bookings.length
        //total revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        return res.status(200).json({
            success: true, DashboardData: {
                bookings,
                totalBookings,
                totalRevenue
            }
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const stripPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        const roomData = await Room.findById(booking.room).populate('hotel');
        if (!roomData || !roomData.hotel) {
            return res.status(404).json({ success: false, message: 'Room or Hotel not found' });
        }

        const totalPrice = booking.totalPrice;
        if (!totalPrice) {
            return res.status(400).json({ success: false, message: 'Total price missing in booking' });
        }

        const { origin } = req.headers;

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: roomData.hotel.name,
                    },
                    unit_amount: totalPrice * 100,
                },
                quantity: 1,
            },
        ];

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader/myBookings`,
            cancel_url: `${origin}/myBookings`,
            metadata: {
                bookingId,
            },
        });

        return res.status(200).json({ success: true, url: session.url });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Payment failed' });
    }
};
