import express from 'express'
import { protect } from '../middleware/authMiddleWare.js';
import { registerHotel } from '../controller/hotelController.js';

const hotelRouter = express.Router();

hotelRouter.post('/',protect,registerHotel);

export default hotelRouter;