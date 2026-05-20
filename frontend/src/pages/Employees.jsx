import { useEffect, useState } from "react";
import { Plus, Search, Building2, Filter, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";

export default function Employees() {
  const { employees, fetchEmployees, deleteEmployee, isLoading } = useStore();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const res = await deleteEmployee(id);
      if (res.success) {
        toast.success("Employee deleted successfully");
      } else {
        toast.error("Failed to delete employee");
      }
    }
  };

  const filtered = employees.filter((emp) => {
    const fullName = `${emp.fname} ${emp.lname}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) &&
      (department === "All" || emp.dep_name === department)
    );
  });

  const departments = ["All", ...new Set(employees.map(emp => emp.dep_name).filter(Boolean))];

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div data-aos='fade-down' className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
          <p className="text-slate-500 text-sm">Manage employee records in table view</p>
        </div>
        <Link to='/create-employee' className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:scale-105 transition flex items-center gap-2">
          <Plus size={18} />
          Add Employee
        </Link>
      </div>

      {/* Filters */}
      <div data-aos='fade-up' className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 w-full lg:w-1/3 px-3 py-2 rounded-xl bg-slate-100">
          <Search className="size-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search employee..."
            className="w-full bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-slate-500" />
          <select
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div data-aos='fade-up' className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left p-4">Employee</th>
                <th className="text-left p-4">Code</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Contact</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400">Loading employees...</td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((emp) => (
                  <tr key={emp.id} className="border-t hover:bg-slate-50 transition">

                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                        {emp.fname[0]}
                        {emp.lname[0]}
                      </div>
                      <span className="font-medium text-slate-700">{emp.fname} {emp.lname}</span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{emp.emp_number}</td>
                    <td className="p-4 text-slate-600">{emp.dep_name}</td>
                    <td className="p-4 text-slate-600">{emp.position}</td>
                    <td className="p-4 text-slate-600">{emp.telephone}</td>
                    <td className="p-4">
                      {
                        emp.status === 'Active' ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                            {emp.status}
                          </span>
                        ) : emp.status === 'Inactive'? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                            {emp.status}
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                            {emp.status}
                          </span>
                        )
                      }
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/employee/profile/${emp.emp_number}/ID/${emp.id}`} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200">
                          <Eye className="size-4" />
                        </Link>
                        <Link to={`/edit-employee/${emp.id}`} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                          <Pencil className="size-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-slate-400">No employees found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}