import express from 'express'
import upload from '../middleware/uploadMiddleWare.js';
import { protect } from '../middleware/authMiddleWare.js';
import { createRoom, getRoom, getOwnerRoom, toggleRoomAvaibility } from '../controller/roomController.js'

const roomRouter = express.Router();

roomRouter.post('/', upload.array('images', 4), protect, createRoom);
roomRouter.get('/', getRoom);
roomRouter.get('/owner', getOwnerRoom);
roomRouter.post('/toggle-avaibility', protect, toggleRoomAvaibility);


export default roomRouter