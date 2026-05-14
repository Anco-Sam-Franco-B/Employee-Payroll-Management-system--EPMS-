import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  Building2,
  Filter,
  Loader2,
} from "lucide-react";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";

export default function ReportForm() {
  const { departments, fetchDepartments } = useStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    department: "All",
    status: "All",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/reports/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to generate report");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `EPMS_Report_${new Date().toLocaleDateString()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Report generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error generating report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <form
        onSubmit={handleGenerate}
        className="w-full max-w-2xl bg-white border rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="size-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Generate Payroll Report
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Download a detailed PDF report of salary records
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <div>
              <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                <Building2 className="size-4" /> Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
              >
                <option value="All">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.dep_name}>
                    {d.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                <Filter className="size-4" /> Payment Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid Only</option>
                <option value="Pending">Pending Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Date */}
            <div>
              <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                <Calendar className="size-4" /> From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={form.fromDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                <Calendar className="size-4" /> To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={form.toDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {loading ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            <FileText className="size-5" />
          )}
          {loading ? "Generating PDF..." : "Generate PDF Report"}
        </button>

        <p className="mt-6 text-center text-xs text-slate-400">
          The report will include employee names, departments, gross salary, deductions, and net payouts.
        </p>
      </form>
    </div>
  );
}