import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import authRoute from './route/authRoute.js'; 
dotenv.config();

const PORT = process.env.PORT || 5002
const app = express();

//middleware
app.use(express.json())

//public route
app.use('/auth', authRoute)

connectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`running on ${PORT}`)
    })
})