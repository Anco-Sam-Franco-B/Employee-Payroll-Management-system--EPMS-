import express from 'express'
import depRoutes from './routers/Department.Routes.js'
import empRoutes from './routers/Employee.Routes.js'
import salaryRoutes from './routers/Salary.Routes.js'
import reportRoutes from './routers/Report.Routes.js'
import dashboardRoutes from './routers/Dashboard.Routes.js'
import authRoutes from './routers/Auth.Routes.js'
import { verifyToken } from '../middleware/Auth.Middleware.js'

const mainRoutes=express.Router()

mainRoutes.use('/auth', authRoutes)

// Protected routes
mainRoutes.use('/department', verifyToken, depRoutes)
mainRoutes.use('/employee', verifyToken, empRoutes)
mainRoutes.use('/salary', verifyToken, salaryRoutes)
mainRoutes.use('/report', verifyToken, reportRoutes)
mainRoutes.use('/dashboard', verifyToken, dashboardRoutes)

mainRoutes.use((req, res)=>{
    return res.status(404).json({
        name: 'MAIN ROUTES',
        message: '404 Route Not Found',
        routeName: req.path
    })
})

export default mainRoutes