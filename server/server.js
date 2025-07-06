import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import webBook from './controller/clerkWebBook.js';
import userRouter from './routes/userRouter.js';
import hotelRouter from './routes/hotelRouter.js';
import connetCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRouter.js';

//connectivity

connectDB()
connetCloudinary

const app = express();

//Middleware

app.use(cors()) //enable cross-origin resourse sharing  
app.use('/api/clerk', express.raw({ type: 'application/json' }), webBook);
app.use(express.json())
app.use(clerkMiddleware()) 



const port = process.env.port || 3000;

//Routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})