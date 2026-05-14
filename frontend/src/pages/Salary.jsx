import { useState } from "react";
import { Link } from 'react-router-dom'
import {
  Search,
  Building2,
  Calendar,
  Filter,
  DollarSign,
  Eye,
  Download,
} from "lucide-react";

export default function SalaryPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [month, setMonth] = useState("2026-05");

  const salaries = [
    {
      id: 1,
      name: "John Doe",
      dept: "IT",
      basic: 1000,
      bonus: 200,
      deduction: 50,
      status: "Paid",
    },
    {
      id: 2,
      name: "Sarah Kim",
      dept: "HR",
      basic: 1200,
      bonus: 150,
      deduction: 100,
      status: "Pending",
    },
    {
      id: 3,
      name: "Ali Hassan",
      dept: "Finance",
      basic: 1100,
      bonus: 100,
      deduction: 80,
      status: "Paid",
    },
    {
      id: 4,
      name: "Jane Smith",
      dept: "Marketing",
      basic: 1300,
      bonus: 250,
      deduction: 60,
      status: "Pending",
    },
  ];

  const filtered = salaries.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (department === "All" || emp.dept === department) &&
      (status === "All" || emp.status === status)
    );
  });

  const getNetSalary = (s) => s.basic + s.bonus - s.deduction;

  return (
    <div className="p-6  min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Salary Management
          </h1>
          <p className="text-slate-500 text-sm">
            Process and manage employee payroll
          </p>
        </div>

        <Link to='/process-payroll' className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:scale-105 transition">
          Process Payroll
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
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Month */}
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-slate-500" />
          <input
            type="month"
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left p-4">Employee</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Basic</th>
              <th className="text-left p-4">Bonus</th>
              <th className="text-left p-4">Deduction</th>
              <th className="text-left p-4">Net Salary</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-slate-50 transition">

                {/* Employee */}
                <td className="p-4 font-medium text-slate-700">
                  {s.name}
                </td>

                {/* Department */}
                <td className="p-4 text-slate-600">
                  {s.dept}
                </td>

                {/* Basic */}
                <td className="p-4 text-slate-600">
                  ${s.basic}
                </td>

                {/* Bonus */}
                <td className="p-4 text-green-600">
                  +${s.bonus}
                </td>

                {/* Deduction */}
                <td className="p-4 text-red-500">
                  -${s.deduction}
                </td>

                {/* Net Salary */}
                <td className="p-4 font-bold text-slate-800">
                  ${getNetSalary(s)}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      s.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200">
                      <Eye className="size-4" />
                    </button>

                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <Download className="size-4" />
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
            No salary records found.
          </div>
        )}
      </div>
    </div>
  );
}