import express from "express";
import dotenv from 'dotenv'
import { connectToDb } from "./db/connect.db.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.routes.js"
import cors from 'cors'
dotenv.config()

const app = express()

const port = process.env.PORT || 8800
app.listen(port,()=>{
    connectToDb()
    console.log(`server is running on port ${port}`)
})

// app middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())

// routes middleware
app.use('/post',postRoutes)

// error handler middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success: false,
        message,
    }) 
})