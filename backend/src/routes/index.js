import express from 'express'
import depRoutes from './routers/Department.Routes.js'
import empRoutes from './routers/Employee.Routes.js'

const mainRoutes=express.Router()

mainRoutes.use('/department', depRoutes)
mainRoutes.use('/employee', empRoutes)

mainRoutes.use((req, res)=>{
    return res.status(404).json({
        name: 'MAIN ROUTES',
        message: '404 Route Not Found',
        routeName: req.path
    })
})

export default mainRoutes