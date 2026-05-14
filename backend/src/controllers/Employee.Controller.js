import db from '../config/Database.js'
import generateEmpNumber from '../utils.js'

export const ViewEmp = async (req, res) => {
    try {
        const [data] = await db.promise().query('SELECT employee.*, department.dep_name FROM employee JOIN department ON department.id=employee.dep_id');
        return res.status(200).json({
            message: 'Employees Fetched!',
            empData: data,
            total: data.length
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const ViewEmpDetail = async (req, res) => {
    const { empId } = req.params;
    if (!empId) return res.status(400).json({ message: 'Employee ID is required' });

    try {
        const [data] = await db.promise().query('SELECT * FROM employee WHERE id = ?', [empId]);
        if (data.length === 0) return res.status(404).json({ message: 'Employee does not exist' });

        return res.status(200).json({
            message: 'Employee Fetched!',
            empData: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const ViewDepEmp = async (req, res) => {
    const { depId } = req.params;
    if (!depId) return res.status(400).json({ message: 'Department ID is required' });

    try {
        const [data] = await db.promise().query('SELECT employee.*, department.dep_name FROM employee JOIN department ON department.id=employee.dep_id WHERE dep_id = ?', [depId]);
        if (data.length === 0) return res.status(404).json({ message: 'There is no employee on this Department' });

        return res.status(200).json({
            message: 'Department Employees Fetched!',
            empData: data,
            total: data.length
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const createEmp = async (req, res) => {
    const { depId } = req.params;
    const { fname, lname, position, address, telphone, gender, heredDate } = req.body;

    if (!depId) return res.status(400).json({ message: 'Department ID is required' });
    if (!fname || !lname || !position || !address || !telphone || !gender || !heredDate) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const empNumber = 'EMP' + generateEmpNumber();
        const sql = 'INSERT INTO employee(dep_id, emp_number, fname, lname, position, address, telephone, gender, hered_date, create_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
        await db.promise().query(sql, [depId, empNumber, fname, lname, position, address, telphone, gender, heredDate]);

        return res.status(201).json({ message: 'Employee created!' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const deleteEmp = async (req, res) => {
    const { empId } = req.params;
    if (!empId) return res.status(400).json({ message: 'Employee ID is required' });

    try {
        await db.promise().query('DELETE FROM employee WHERE id = ?', [empId]);
        return res.status(200).json({ message: 'Employee deleted!' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const updateEmp = async (req, res) => {
    const { empId } = req.params;
    const { fname, lname, position, address, telphone, gender, heredDate, depId } = req.body;

    if (!empId) return res.status(400).json({ message: 'Employee ID is required' });

    try {
        const sql = 'UPDATE employee SET fname=?, lname=?, position=?, address=?, telephone=?, gender=?, hered_date=?, dep_id=? WHERE id=?';
        await db.promise().query(sql, [fname, lname, position, address, telphone, gender, heredDate, depId, empId]);

        return res.status(200).json({ message: 'Employee updated!' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}