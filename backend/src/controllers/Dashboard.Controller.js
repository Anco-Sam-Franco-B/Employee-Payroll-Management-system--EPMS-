import db from "../config/Database.js";

export const getStats = async (req, res) => {
  try {
    const queries = {
      totalEmployees: "SELECT COUNT(*) as count FROM employee",
      totalDepartments: "SELECT COUNT(*) as count FROM department",
      totalPayroll: "SELECT SUM(net_salary) as total FROM salary",
      recentEmployees: "SELECT fname, lname, create_at FROM employee ORDER BY create_at DESC LIMIT 5"
    };

    const stats = {};
    
    db.query(queries.totalEmployees, (err, empData) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.totalEmployees = empData[0].count;

      db.query(queries.totalDepartments, (err, depData) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.totalDepartments = depData[0].count;

        db.query(queries.totalPayroll, (err, payData) => {
          if (err) return res.status(500).json({ error: err.message });
          stats.totalPayroll = payData[0].total || 0;

            db.query(queries.recentEmployees, (err, recentData) => {
              if (err) return res.status(500).json({ error: err.message });
              stats.recentActivities = recentData.map(emp => ({
                message: `New employee added: ${emp.fname} ${emp.lname}`,
                time: emp.create_at
              }));

              db.query("SELECT d.dep_name, COUNT(e.id) as count FROM department d LEFT JOIN employee e ON d.id = e.dep_id GROUP BY d.id", (err, distribution) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.departmentDistribution = distribution;
                return res.status(200).json(stats);
              });
            });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
