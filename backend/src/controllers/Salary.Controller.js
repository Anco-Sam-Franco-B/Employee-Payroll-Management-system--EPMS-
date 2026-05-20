import db from "../config/Database.js";

export const viewSalaries = async (req, res) => {
  try {
    const sql = `
      SELECT 
        s.*, 
        e.fname, 
        e.lname, 
        d.dep_name,
        d.gross_salary as basic,
        d.total_deduction as deduction
      FROM salary s
      JOIN employee e ON e.id = s.emp_id
      JOIN department d ON d.id = s.dep_id
    `;
    const [data] = await db.promise().query(sql);
    return res.status(200).json({
      message: "Salaries fetched successfully",
      salaryData: data
    });
  } catch (error) { 
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const processPayroll = async (req, res) => {
  const { empId, depId, basic, bonus, deduction, month } = req.body;
  
  if (!empId || !depId || !month) {
    return res.status(400).json({ message: "Employee ID, Department ID, and Month are required" });
  }

  try {
    const netSalary = parseFloat(basic || 0) + parseFloat(bonus || 0) - parseFloat(deduction || 0);
    const sql = "INSERT INTO salary (dep_id, emp_id, net_salary, month, create_at) VALUES (?, ?, ?, ?, NOW())";
    await db.promise().query(sql, [depId, empId, netSalary, month]);
    
    return res.status(201).json({ message: "Payroll processed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
