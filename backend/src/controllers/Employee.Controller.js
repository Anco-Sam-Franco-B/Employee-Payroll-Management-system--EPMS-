import db from '../config/Database.js'
import generateEmpNumber from '../utils.js'

export const ViewEmp=async(req, res)=>{
    try {
        db.query('SELECT employee.*, department.* FROM employee JOIN department ON department.id=employee.dep_id', (err, data)=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during fetching emploeyees data',
                errorMessage: err.message
            })

            return res.status(200).json({
                message: 'Employee Fetched!',
                empData: data,
                total: data.length
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

export const ViewEmpDetail=async(req, res)=>{
    const {empId}=req.params
    if(!empId) return res.status(400).json({
        message: 'Employee ID is required to get employee details'
    })
    try {
        db.query(`SELECT * FROM employee WHERE id='${empId}'`, (err, data)=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during fetching emploeyee data',
                errorMessage: err.message
            })
            if(data.length === 0) return res.status(404).json({
                message: 'Employee does not exist'
            })
            return res.status(200).json({
                message: 'Employee Fetched!',
                empData: data,
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

export const ViewDepEmp=async(req, res)=>{
    const {depId}=req.params
    if(!depId) return res.status(400).json({
        message: 'Department ID is required to get employee department'
    })
    try {
        db.query(`SELECT employee.*, department.* FROM employee JOIN department ON department.id=employee.dep_id WHERE dep_id='${depId}'`, (err, data)=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during fetching department emploeyees data',
                errorMessage: err.message
            })
            if(data.length === 0) return res.status(404).json({
                message: 'There is no employee on this Department'
            })
            return res.status(200).json({
                message: 'Department Employees Fetched!',
                empData: data,
                total: data.length
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

export const createEmp=async (req,res) => {
    const {depId}=req.params
    if(!depId) return res.status(400).json({
        message: 'Department ID is required in order to create new employee on that department'
    })
    const { fname, lname, position, address, telphone, gender, heredDate }=req.body
    if(!fname || !lname || !position || !address || !telphone || !gender || !heredDate) return res.status(400).json({
        message: 'All fields are required!'
    })
    try {
        const title='EMP'
        const empNumber=title.concat(generateEmpNumber())
        db.query(`INSERT INTO employee(dep_id, emp_number, fname, lname, position, address, telephone, gender, hered_date, create_at) VALUES('${depId}', '${empNumber}', '${fname}', '${lname}', '${position}', '${address}', '${telphone}', '${gender}', '${heredDate}', NOW())`, err=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during creating new employee!',
                errorMessage: err.message
            })
            return res.status(201).json({
                message: 'Employee created!'
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

export const deleteEmp=async(req, res)=>{
    const {empId}=req.params
    if(!empId) return res.status(400).json({
        message: 'Employee ID is required to delete employee details'
    })
    try {
        db.query(`SELECT * FROM employee WHERE id='${empId}'`, (err)=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during deleting emploeyee data',
                errorMessage: err.message
            })
            return res.status(200).json({
                message: 'Employee deleted!'
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}