import { useEffect } from "react";
import { Users, Building2, HandCoins, FileText, TrendingUp } from "lucide-react";
import { useStore } from "../store/useStore";

export default function Dashboard() {
  const { stats, fetchStats } = useStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

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
            <h2 className="text-xl font-bold">{stats?.totalEmployees || 0}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-3 rounded-xl bg-green-100">
            <Building2 className="text-green-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Departments</p>
            <h2 className="text-xl font-bold">{stats?.totalDepartments || 0}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-3 rounded-xl bg-emerald-100">
            <HandCoins className="text-emerald-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Total Payroll</p>
            <h2 className="text-xl font-bold">${stats?.totalPayroll?.toLocaleString() || 0}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
          <div className="p-3 rounded-xl bg-purple-100">
            <FileText className="text-purple-600" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Reports</p>
            <h2 className="text-xl font-bold">{stats?.totalReports || 0}</h2>
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

          <div className="space-y-4 mt-4">
            {stats?.departmentDistribution?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">{item.dep_name}</span>
                  <span className="text-slate-400">{item.count} employees</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(item.count / (stats.totalEmployees || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Panel */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold text-slate-700 mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3 text-sm">
            {stats?.recentActivities?.length > 0 ? (
              stats.recentActivities.map((activity, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-xl">
                  {activity.message}
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}