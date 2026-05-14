import express from 'express'
import { ViewDep, CreateDep, ViewDepDetails, deleteDep, updateDep } from '../../controllers/Department.Controller.js'

const depRoutes=express.Router()

depRoutes.get('/', ViewDep)
depRoutes.get('/:depId', ViewDepDetails)
depRoutes.post('/create', CreateDep)
depRoutes.put('/update/:depId', updateDep)
depRoutes.delete('/delete/:depId', deleteDep)

depRoutes.use((req, res)=>{
    return res.status(404).json({
        name: 'DEPARTMENT ROUTES',
        message: '404 Route Not Found',
        routeName: req.path
    })
})

export default depRoutes