import express  from  'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import webBook from './controller/clerkWebBook.js';

connectDB()

const app = express();
app.use(cors()) //enable cross-origin resourse sharing  
app.use(express.json())
app.use(clerkMiddleware()) //middle ware

app.use('/api/clerk',webBook)
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})