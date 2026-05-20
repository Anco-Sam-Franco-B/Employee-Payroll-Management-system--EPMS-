import { useEffect } from "react";
import { Users, Building2, HandCoins, FileText, TrendingUp, ArrowUpRight, Activity } from "lucide-react";
import { useStore } from "../store/useStore";

const COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
];

export default function Dashboard() {
  const { stats, fetchStats } = useStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="p-6 min-h-screen bg-slate-50/50">

      {/* Header */}
      <div data-aos='fade-zome' className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Real-time insights into your payroll and workforce.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border text-sm font-medium text-slate-600">
          <Activity size={16} className="text-green-500" />
          System Status: Online
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard 
          icon={<Users className="text-blue-600" />} 
          label="Total Employees" 
          value={stats?.totalEmployees || 0} 
          color="blue"
        />

        <StatCard 
          icon={<Building2 className="text-indigo-600" />} 
          label="Departments" 
          value={stats?.totalDepartments || 0} 
          color="indigo"
        />

        <StatCard 
          icon={<HandCoins className="text-emerald-600" />} 
          label="Monthly Payroll" 
          value={`$${stats?.totalPayroll?.toLocaleString() || 0}`} 
          color="emerald"
        />

        <StatCard 
          icon={<FileText className="text-amber-600" />} 
          label="Active Reports" 
          value={stats?.totalReports || 0} 
          color="amber"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* Chart Section */}
        <div data-aos='fade-right' className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Department Distribution</h2>
              <p className="text-sm text-slate-400">Headcount breakdown by department</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <TrendingUp className="text-blue-500" size={20} />
            </div>
          </div>

          <div data-aos='fade-zome' className="space-y-6">
            {stats?.departmentDistribution?.map((item, index) => (
              <div key={index} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700 font-semibold group-hover:text-blue-600 transition">{item.dep_name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold">{item.count}</span>
                    <span className="text-slate-400 text-xs">({((item.count / (stats.totalEmployees || 1)) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`${COLORS[index % COLORS.length]} h-full rounded-full transition-all duration-1000 ease-out shadow-sm`} 
                    style={{ width: `${(item.count / (stats.totalEmployees || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {(!stats?.departmentDistribution || stats.departmentDistribution.length === 0) && (
              <div className="text-center py-10 text-slate-400 italic">
                No department data available yet.
              </div>
            )}
          </div>
        </div>

        {/* Activity Section */}
        <div data-aos='fade-left' className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <button className="text-blue-500 text-xs font-bold hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="space-y-4">
            {stats?.recentActivities?.length > 0 ? (
              stats.recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-600 leading-relaxed">{activity.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                      {activity.time || "Just now"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Activity size={32} className="opacity-20 mb-2" />
                <p className="text-sm">No recent activities found</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div data-aos='fade-zome-in' className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className={`p-4 rounded-2xl w-fit mb-4 transition-transform group-hover:scale-110 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <h2 className="text-3xl font-black text-slate-900 mt-1">{value}</h2>
      </div>
    </div>
  );
}

