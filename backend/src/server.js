import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import { connectDB } from './config/db.js';
import authRoute from './route/authRoute.js'; 
import userRoute from './route/userRoute.js';
import examRoute from './route/examsRoute.js';
import orderRouter from './route/orderRoute.js';
import aiRoute from './route/aiRoute.js';
import adminRoute from './route/adminRoute.js';

import cookieParser from 'cookie-parser'
import { protectedRoute } from './middleware/authMiddleware.js';
import checkRoles from './middleware/checkPermission.js';
import { ROLES } from './constants/Roles.js';
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
app.use('/payment', orderRouter)
app.use('/ai', aiRoute)
//private route
app.use(protectedRoute)
app.use('/users', userRoute)

app.use(checkRoles(ROLES.ADMIN))
app.use('/admin', adminRoute)



connectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`running on ${PORT}`)
    })
})