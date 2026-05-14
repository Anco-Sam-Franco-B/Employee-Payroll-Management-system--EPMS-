import { useState } from "react";
import {
  Search,
  Calendar,
  Filter,
  FileText,
  Download,
  Eye,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Reports() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-05-01");

  const reports = [
    {
      id: 1,
      title: "Monthly Payroll Report",
      type: "Payroll",
      status: "Generated",
      date: "2026-05-01",
    },
    {
      id: 2,
      title: "Employee Attendance Report",
      type: "Attendance",
      status: "Pending",
      date: "2026-04-20",
    },
    {
      id: 3,
      title: "Department Performance Report",
      type: "Performance",
      status: "Generated",
      date: "2026-04-15",
    },
    {
      id: 4,
      title: "Salary Summary Report",
      type: "Payroll",
      status: "Generated",
      date: "2026-03-30",
    },
  ];

  const filtered = reports.filter((r) => {
    return (
      r.title.toLowerCase().includes(search.toLowerCase()) &&
      (type === "All" || r.type === type) &&
      (status === "All" || r.status === status)
    );
  });

  return (
    <div className="p-6  min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Reports
          </h1>
          <p className="text-slate-500 text-sm">
            Generate and manage system reports
          </p>
        </div>

        <Link to='/generate-report' className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:scale-105 transition">
          + Generate Report
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col lg:flex-row gap-4 mb-6">

        {/* Search */}
        <div className="flex items-center gap-2 w-full lg:w-1/3 px-3 py-2 rounded-xl bg-slate-100">
          <Search className="size-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Type */}
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-slate-500" />
          <select
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>All</option>
            <option>Payroll</option>
            <option>Attendance</option>
            <option>Performance</option>
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
            <option>Generated</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-slate-500" />
          <input
            type="date"
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span className="text-slate-400">-</span>
          <input
            type="date"
            className="px-3 py-2 rounded-xl bg-slate-100 text-sm outline-none"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white border rounded-2xl p-5 shadow-sm flex items-center gap-3">
          <BarChart3 className="text-blue-500" />
          <div>
            <p className="text-slate-500 text-sm">Total Reports</p>
            <h2 className="text-xl font-bold">{reports.length}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm flex items-center gap-3">
          <FileText className="text-green-500" />
          <div>
            <p className="text-slate-500 text-sm">Generated</p>
            <h2 className="text-xl font-bold">
              {reports.filter((r) => r.status === "Generated").length}
            </h2>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm flex items-center gap-3">
          <Filter className="text-yellow-500" />
          <div>
            <p className="text-slate-500 text-sm">Pending</p>
            <h2 className="text-xl font-bold">
              {reports.filter((r) => r.status === "Pending").length}
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left p-4">Report Title</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t hover:bg-slate-50 transition">

                <td className="p-4 font-medium text-slate-700">
                  {r.title}
                </td>

                <td className="p-4 text-slate-600">{r.type}</td>

                <td className="p-4 text-slate-600">{r.date}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.status === "Generated"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

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

        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-400">
            No reports found.
          </div>
        )}
      </div>
    </div>
  );
}