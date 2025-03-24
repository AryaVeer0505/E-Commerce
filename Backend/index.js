import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'

// App congig 
const app=express()
const port=process.env.PORT || 4000

connectDb()

connectCloudinary()

// Middlewares 
app.use(express.json())

app.use(cors())

// API end points 
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
   res.send("Api Working")
})

app.listen(port,()=>{
    console.log('Server Started on port:',port)
})