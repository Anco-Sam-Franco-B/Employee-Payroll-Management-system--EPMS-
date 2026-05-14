import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
  Search,
  Building2,
  Calendar,
  Filter,
  Eye,
  Download,
  Loader2,
} from "lucide-react";
import { useStore } from "../store/useStore";

export default function SalaryPage() {
  const { salaries, fetchSalaries, isLoading, departments, fetchDepartments } = useStore();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [monthFilter, setMonthFilter] = useState("");

  useEffect(() => {
    fetchSalaries();
    fetchDepartments();
  }, [fetchSalaries, fetchDepartments]);

  const filtered = (salaries || []).filter((s) => {
    const fullName = `${s.fname} ${s.lname}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) &&
      (department === "All" || s.dep_name === department) &&
      (!monthFilter || s.month === monthFilter)
    );
  });

  return (
    <div className="p-6 min-h-screen">
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
            {departments.map(d => (
              <option key={d.id} value={d.dep_name}>{d.dep_name}</option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-slate-500" />
          <input
            type="month"
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left p-4">Employee</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Basic</th>
              <th className="text-left p-4">Deduction</th>
              <th className="text-left p-4">Net Salary</th>
              <th className="text-left p-4">Month</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
               <tr>
                 <td colSpan="8" className="p-10 text-center">
                    <Loader2 className="animate-spin size-6 text-blue-500 mx-auto" />
                 </td>
               </tr>
            ) : filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-700">
                  {s.fname} {s.lname}
                </td>
                <td className="p-4 text-slate-600">
                  {s.dep_name}
                </td>
                <td className="p-4 text-slate-600">
                  ${s.basic}
                </td>
                <td className="p-4 text-red-500">
                  -${s.deduction}
                </td>
                <td className="p-4 font-bold text-slate-800">
                  ${s.net_salary}
                </td>
                <td className="p-4 text-slate-600">
                  {s.month}
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                    Paid
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200" title="View Details">
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="Download Slip">
                      <Download className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {!isLoading && filtered.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No salary records found.
          </div>
        )}
      </div>
    </div>
  );
}