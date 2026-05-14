import db from '../config/Database.js'

export const ViewDep = async (req, res) => {
    try {
        const [data] = await db.promise().query('SELECT * FROM department');
        return res.status(200).json({
            message: 'Departments fetched!',
            depData: data,
            total: data.length
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const ViewDepDetails = async (req, res) => {
    const { depId } = req.params;
    if (!depId) return res.status(400).json({ message: 'Department ID is required' });

    try {
        const [data] = await db.promise().query('SELECT * FROM department WHERE id = ?', [depId]);
        if (data.length === 0) return res.status(404).json({ message: 'Department does not exist' });

        return res.status(200).json({
            message: 'Department fetched!',
            depData: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const CreateDep = async (req, res) => {
    const { depCode, depName, grossSalary, totalDeduction } = req.body;
    if (!depCode || !depName || !grossSalary || !totalDeduction) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const sql = 'INSERT INTO department(dep_code, dep_name, gross_salary, total_deduction) VALUES(?, ?, ?, ?)';
        await db.promise().query(sql, [depCode, depName, grossSalary, totalDeduction]);
        return res.status(201).json({ message: 'Department created!' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const updateDep = async (req, res) => {
    const { depId } = req.params;
    const { depCode, depName, grossSalary, totalDeduction } = req.body;

    if (!depId) return res.status(400).json({ message: 'Department ID is required' });
    if (!depCode || !depName || !grossSalary || !totalDeduction) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const sql = 'UPDATE department SET dep_code=?, dep_name=?, gross_salary=?, total_deduction=? WHERE id=?';
        await db.promise().query(sql, [depCode, depName, grossSalary, totalDeduction, depId]);
        return res.status(200).json({ message: 'Department updated!' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}

export const deleteDep = async (req, res) => {
    const { depId } = req.params;
    if (!depId) return res.status(400).json({ message: 'Department ID is required' });

    try {
        await db.promise().query('DELETE FROM department WHERE id = ?', [depId]);
        return res.status(200).json({ message: 'Department deleted!' });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            errorMessage: error.message
        });
    }
}