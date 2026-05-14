import { useState } from "react";
import {
  Search,
  Building2,
  Filter,
  User,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function EmployeesTable() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const employees = [
    { id: 1, name: "John Doe", dept: "IT", role: "Developer", status: "Active", salary: "$1200" },
    { id: 2, name: "Sarah Kim", dept: "HR", role: "Manager", status: "Active", salary: "$1500" },
    { id: 3, name: "Ali Hassan", dept: "Finance", role: "Accountant", status: "Inactive", salary: "$1100" },
    { id: 4, name: "Jane Smith", dept: "Marketing", role: "SEO Specialist", status: "Active", salary: "$1300" },
  ];

  const filtered = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (department === "All" || emp.dept === department) &&
      (status === "All" || emp.status === status)
    );
  });

  return (
    <div className="p-6 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Employees
          </h1>
          <p className="text-slate-500 text-sm">
            Manage employee records in table view
          </p>
        </div>

        <Link to='/create-employee' className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:scale-105 transition">
          + Add Employee
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 mb-6">

        {/* Search */}
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

        {/* Department */}
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-slate-500" />
          <select
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>All</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-slate-500" />
          <select
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left p-4">Employee</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Salary</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((emp) => (
              <tr
                key={emp.id}
                className="border-t hover:bg-slate-50 transition"
              >
                {/* Employee */}
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                    {emp.name.charAt(0)}
                  </div>

                  <span className="font-medium text-slate-700">
                    {emp.name}
                  </span>
                </td>

                {/* Department */}
                <td className="p-4 text-slate-600">
                  {emp.dept}
                </td>

                {/* Role */}
                <td className="p-4 text-slate-600">
                  {emp.role}
                </td>

                {/* Salary */}
                <td className="p-4 font-medium text-slate-700">
                  {emp.salary}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200">
                      <Eye className="size-4" />
                    </button>

                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <Pencil className="size-4" />
                    </button>

                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-400">
            No employees found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}