import db from "../config/Database.js";

export const getStats = async (req, res) => {
  try {
    const [empCount] = await db.promise().query("SELECT COUNT(*) as count FROM employee");
    const [depCount] = await db.promise().query("SELECT COUNT(*) as count FROM department");
    const [payrollSum] = await db.promise().query("SELECT SUM(net_salary) as total FROM salary");
    const [recentEmps] = await db.promise().query("SELECT fname, lname, create_at FROM employee ORDER BY create_at DESC LIMIT 5");
    const [distribution] = await db.promise().query("SELECT d.dep_name, COUNT(e.id) as count FROM department d LEFT JOIN employee e ON d.id = e.dep_id GROUP BY d.id");

    const stats = {
      totalEmployees: empCount[0].count,
      totalDepartments: depCount[0].count,
      totalPayroll: payrollSum[0].total || 0,
      recentActivities: recentEmps.map(emp => ({
        message: `New employee added: ${emp.fname} ${emp.lname}`,
        time: emp.create_at
      })),
      departmentDistribution: distribution
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
