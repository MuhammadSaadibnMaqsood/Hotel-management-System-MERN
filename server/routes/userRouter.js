import express from 'express';
import { protect } from '../middleware/authMiddleWare.js';
import { getUserData, storeUserSearchCities } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/stored-recent-search',protect,storeUserSearchCities);

export default userRouter