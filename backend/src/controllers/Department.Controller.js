import db from '../config/Database.js'

export const ViewDep=async(req, res)=>{
    try {
        db.query('SELECT * FROM department', (err, data)=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during fetching departments data',
                errorMessage: err.message
            })
            return res.status(200).json({
                message: 'Departments fetched!',
                depData: data,
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

export const ViewDepDetails=async(req, res)=>{
    const {depId}= req.params
    if(!depId) return res.status(400).json({
        message: 'Department ID is required to get department details'
    })
    try {
        db.query(`SELECT * FROM department WHERE id='${depId}'`, (err, data)=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during fetching department data',
                errorMessage: err.message
            })
            if(data.length === 0) return res.status(404).json({
                message: 'Department does not exists'
            })
            return res.status(200).json({
                message: 'Department fetched!',
                depData: data,
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}

export const CreateDep=async(req, res)=>{
    const { depCode, depName, grossSalary, totalDeduction }=req.body
    if(!depCode || !depName || !grossSalary || !totalDeduction) return res.status(400).json({
        message: 'All fields are required!'
    })

    try {
       db.query(`INSERT INTO department(dep_code, dep_name, gross_salary, total_deduction) VALUES('${depCode}', '${depName}', '${grossSalary}', '${totalDeduction}')`, err=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during creating new department',
                errorMessage: err.message
            })
            return res.status(201).json({
                message: 'Department created!'
            })
       }) 
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        }) 
    }
}

export const updateDep=async(req, res)=>{
    const {depId}= req.params
    if(!depId) return res.status(400).json({
        message: 'Department ID is required to delete department details'
    })
    const { depCode, depName, grossSalary, totalDeduction }=req.body
    if(!depCode || !depName || !grossSalary || !totalDeduction) return res.status(400).json({
        message: 'All fields are required!'
    })

    try {
        db.query(`UPDATE department SET dep_code='${depCode}', dep_name='${depName}',  gross_salary='${grossSalary}', total_deduction='${totalDeduction}' WHERE id='${depId}'`, err=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during updating department details',
                errorMessage: err.message
            })
            return res.status(200).json({
                message: 'Department updated!'
            })
        })
    } catch (error) {
         return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }

}

export const deleteDep=async(req, res)=>{
    const {depId}= req.params
    if(!depId) return res.status(400).json({
        message: 'Department ID is required to delete department details'
    })
    try {
        db.query(`DELETE FROM department WHERE id='${depId}'`, (err)=>{
            if(err) return res.status(500).json({
                message: 'Something went wrong during delete department data',
                errorMessage: err.message
            })
            return res.status(200).json({
                message: 'Department deleted!'
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        })
    }
}