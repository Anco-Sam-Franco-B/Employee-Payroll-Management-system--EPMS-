import express from 'express'
import { createEmp, deleteEmp, ViewDepEmp, ViewEmp, ViewEmpDetail } from '../../controllers/Employee.Controller.js'

const empRoutes=express.Router()

empRoutes.get('/', ViewEmp)
empRoutes.get('/:empId', ViewEmpDetail)
empRoutes.get('/dep/:depId/emp', ViewDepEmp)
empRoutes.post('/create/:depId/emp', createEmp)
empRoutes.delete('/delete/:empId', deleteEmp)


empRoutes.use((req, res)=>{
    return res.status(404).json({
        name: 'EMPLOYEE ROUTES',
        message: '404 Route Not Found',
        routeName: req.path
    })
})

export default empRoutes