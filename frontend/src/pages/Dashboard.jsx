import { Users, Building2, HandCoins, FileText, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm">
          Welcome back! Here’s what’s happening in your system.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-3 rounded-xl bg-blue-100">
            <Users className="text-blue-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Employees</p>
            <h2 className="text-xl font-bold">1,240</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-3 rounded-xl bg-green-100">
            <Building2 className="text-green-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Departments</p>
            <h2 className="text-xl font-bold">12</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-3 rounded-xl bg-emerald-100">
            <HandCoins className="text-emerald-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Monthly Payroll</p>
            <h2 className="text-xl font-bold">$45,200</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-3 rounded-xl bg-purple-100">
            <FileText className="text-purple-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Reports</p>
            <h2 className="text-xl font-bold">36</h2>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">

        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-700">Payroll Analytics</h2>
            <TrendingUp className="text-green-500" />
          </div>

          <div className="h-64 flex items-center justify-center text-slate-400 border-dashed border-2 rounded-xl">
            Chart Area (Recharts / Chart.js here)
          </div>
        </div>

        {/* Activity Panel */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold text-slate-700 mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-xl">
              New employee added
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              Payroll processed successfully
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              Department updated
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}