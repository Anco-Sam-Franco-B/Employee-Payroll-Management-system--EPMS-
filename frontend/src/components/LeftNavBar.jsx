import React from 'react'
import packageJson from '../../package.json';
import { Building2, HandCoins, LayoutDashboard, ReceiptTextIcon, User, Users2, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom';

function LeftNavBar() {
  return (
    <div className='w-[18%] relative shadow-lg h-full bg-white/70 backdrop-blur-x'>
        <div className="w-full p-3 text-center" data-aos="fade-right">
            <div className="flex gap-2 items-center justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-1 rounded-full">
                <Wallet className="size-6 text-white" />
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                EPMS
            </h1>
        </div>
            <i className='text-xs text-gray-400'>Employee Payroll Management System</i>
             <hr className='mt-3' />
        </div>

        <nav className='p-3 w-full text-xs'>
            <h2 className='text-gray-400 font-medium' data-aos="fade-left">QUICK MENU</h2>
            <main className="flex flex-col gap-2 mt-5" data-aos="fade-up">
                <Link 
                    to="/"
                    className="group flex items-center gap-3 px-1 py-1 rounded-2xl bg-white shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-2 rounded-xl bg-blue-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-green-500 transition-all duration-300">
                        <LayoutDashboard className="size-5 text-blue-600 group-hover:text-white" />
                    </div>

                    <span className="text-slate-700 font-semibold group-hover:text-blue-600">
                        Dashboard
                    </span>
                </Link>

                <Link
                    to="/departments"
                    className="group flex items-center gap-3 px-1 py-1 rounded-2xl bg-white shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-2 rounded-xl bg-green-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-green-500 transition-all duration-300">
                        <Building2 className="size-5 text-green-600 group-hover:text-white" />
                    </div>

                    <span className="text-slate-700 font-semibold group-hover:text-green-600">
                        Departments
                    </span>
                </Link>

                <Link
                    to="/employees"
                    className="group flex items-center gap-3 px-1 py-1 rounded-2xl bg-white shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-2 rounded-xl bg-cyan-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-green-500 transition-all duration-300">
                        <User className="size-5 text-cyan-600 group-hover:text-white" />
                    </div>

                    <span className="text-slate-700 font-semibold group-hover:text-cyan-600">
                        Employees
                    </span>
                </Link>

                <Link
                    to="/salary"
                    className="group flex items-center gap-3 px-1 py-1 rounded-2xl bg-white shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-2 rounded-xl bg-emerald-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-green-500 transition-all duration-300">
                        <HandCoins className="size-5 text-emerald-600 group-hover:text-white" />
                    </div>

                    <span className="text-slate-700 font-semibold group-hover:text-emerald-600">
                        Salary
                    </span>
                </Link>

                <Link
                    to="/reports"
                    className="group flex items-center gap-3 px-1 py-1 rounded-2xl bg-white shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-2 rounded-xl bg-violet-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-green-500 transition-all duration-300">
                        <ReceiptTextIcon className="size-5 text-violet-600 group-hover:text-white" />
                    </div>

                    <span className="text-slate-700 font-semibold group-hover:text-violet-600">
                        Reports
                    </span>
                </Link>
            </main>
            
        </nav>

        <div className="inline-flex absolute bottom-3 left-9 items-center gap-3 px-5 py-1 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 animate-pulse"></div>

            <span className="text-gray-200 text-xs uppercase tracking-widest">
                Version
            </span>

            <span className="text-xs font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                v{packageJson.version}
            </span>
        </div>
    </div>
  )
}

export default LeftNavBar