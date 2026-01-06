import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import { connectDB } from './config/db.js';
import authRoute from './route/authRoute.js'; 
import userRoute from './route/userRoute.js';
import examRoute from './route/examsRoute.js';
import cookieParser from 'cookie-parser'
import { protectedRoute } from './middleware/authMiddleware.js';
dotenv.config();

const PORT = process.env.PORT || 5002
const app = express();



//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors());
//public route
app.use('/auth', authRoute)
app.use('/exams', examRoute)
//private route
app.use(protectedRoute)
app.use('/users', userRoute)



connectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`running on ${PORT}`)
    })
})