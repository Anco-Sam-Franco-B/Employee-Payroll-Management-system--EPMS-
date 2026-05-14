import { Bell, Search, Settings, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopNavBar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">



        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-10" data-aos="fade-zome-in">
          <div className="flex items-center gap-2 w-full px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 focus-within:border-blue-400 transition">
            <Search className="size-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search employees, payroll..."
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3" data-aos="fade-zome-in">



          {/* Profile */}
          <Link to='/profile' className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 transition cursor-pointer">
            <UserCircle className="size-6 text-slate-700" />
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              Admin
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}