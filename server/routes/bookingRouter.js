import express from 'express'
import { checkAvaibilityAPI, createBooking, getHotelBooking, getUserBookings } from '../controller/bookingController.js';
import { protect } from '../middleware/authMiddleWare.js';


const bookingRouter = express.Router();

bookingRouter.post('/check-avaibility', checkAvaibilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBooking);


export default bookingRouter;