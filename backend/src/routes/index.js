import express from 'express'
import depRoutes from './routers/Department.Routes.js'
import empRoutes from './routers/Employee.Routes.js'
import salaryRoutes from './routers/Salary.Routes.js'
import reportRoutes from './routers/Report.Routes.js'
import dashboardRoutes from './routers/Dashboard.Routes.js'

const mainRoutes=express.Router()

mainRoutes.use('/department', depRoutes)
mainRoutes.use('/employee', empRoutes)
mainRoutes.use('/salary', salaryRoutes)
mainRoutes.use('/report', reportRoutes)
mainRoutes.use('/dashboard', dashboardRoutes)

mainRoutes.use((req, res)=>{
    return res.status(404).json({
        name: 'MAIN ROUTES',
        message: '404 Route Not Found',
        routeName: req.path
    })
})

export default mainRoutes