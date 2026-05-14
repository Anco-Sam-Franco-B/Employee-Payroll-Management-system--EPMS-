import express from 'express'
import cors  from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import mainRoutes from './routes/index.js'

dotenv.config()

const app=express()
const port=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(morgan("dev"))
app.use('/uploads', express.static('uploads'))

app.use('/api/v1', mainRoutes)

app.use((req, res)=>{
    return res.status(404).json({
        message: '404 Route Not Found',
        routeName: req.path
    })
})


app.listen(port, ()=>console.log(`🚀 Server is running....`))