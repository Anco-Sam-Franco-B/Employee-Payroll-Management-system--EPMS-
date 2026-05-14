import { useState } from "react";
import {
  FileText,
  Calendar,
  Filter,
  Building2,
  User,
  BarChart3,
} from "lucide-react";

export default function ReportForm() {
  const [form, setForm] = useState({
    title: "",
    type: "Payroll",
    department: "All",
    employee: "All",
    status: "All",
    fromDate: "",
    toDate: "",
    format: "PDF",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate   = async () => {
  const response = await fetch("http://localhost:5000/api/reports/pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      department: form.department,
      status: form.status,
      fromDate: form.fromDate,
      toDate: form.toDate,
    }),
  });

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "epms-report.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">

      <form
        className="w-full max-w-3xl bg-white border rounded-2xl shadow-lg p-6"
      >

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="text-blue-500" />
            Generate Report
          </h1>
          <p className="text-slate-500 text-sm">
            Configure filters to generate system reports
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Report Title */}
          <div>
            <label className="text-sm text-slate-600">Report Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Monthly Payroll Report"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 outline-none"
            />
          </div>

          {/* Report Type */}
          <div>
            <label className="text-sm text-slate-600">Report Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>Payroll</option>
              <option>Attendance</option>
              <option>Performance</option>
              <option>Employee Summary</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Building2 className="size-4" /> Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>All</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
          </div>

          {/* Employee */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <User className="size-4" /> Employee
            </label>
            <select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>All</option>
              <option>John Doe</option>
              <option>Sarah Kim</option>
              <option>Ali Hassan</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-slate-600">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>All</option>
              <option>Generated</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Format */}
          <div>
            <label className="text-sm text-slate-600">
              Export Format
            </label>
            <select
              name="format"
              value={form.format}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Calendar className="size-4" /> From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Calendar className="size-4" /> To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={form.toDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mt-5 p-4 bg-slate-50 border rounded-xl">
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Filter className="size-4" />
            Advanced Options
          </h2>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Include Salary Breakdown
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Include Attendance Data
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Include Bonuses & Deductions
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 transition"
        >
          Generate Report
        </button>
      </form>
    </div>
  );
}