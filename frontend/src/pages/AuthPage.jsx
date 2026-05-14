import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(isLogin ? "LOGIN" : "SIGNUP", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">

      <div data-aos='fade-up' className="w-full max-w-4xl bg-white shadow-xl border rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE - INFO */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-blue-500 to-green-500 text-white">
          <h1 className="text-3xl font-bold" data-aos='fade-left'>EPMS System</h1>
          <p data-aos='fade-up' className="mt-2 text-sm opacity-90">
            Employee Payroll Management System
          </p>

          <div className="mt-6 text-sm space-y-2" data-aos='fade-right'>
            <p>✔ Manage Employees</p>
            <p>✔ Process Payroll</p>
            <p>✔ Generate Reports</p>
            <p>✔ Department Control</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8">

          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-slate-100 p-1 rounded-xl flex">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                  isLogin ? "bg-white shadow" : ""
                }`}
              >
                <LogIn className="size-4" />
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${
                  !isLogin ? "bg-white shadow" : ""
                }`}
              >
                <UserPlus className="size-4" />
                Signup
              </button>
            </div>
          </div>

          {/* TITLE */}
          <h2 data-aos='fade-left' className="text-2xl font-bold text-slate-800 text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4" >

            {/* FULL NAME (SIGNUP ONLY) */}
            {!isLogin && (
              <div >
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <User className="size-4" /> Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 outline-none"
                  placeholder="John Doe"
                />
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="text-sm text-slate-600 flex items-center gap-1">
                <Mail className="size-4" /> Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 outline-none"
                placeholder="email@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label className="text-sm text-slate-600 flex items-center gap-1">
                <Lock className="size-4" /> Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 outline-none"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* CONFIRM PASSWORD (SIGNUP ONLY) */}
            {!isLogin && (
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <Lock className="size-4" /> Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 outline-none"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:scale-105 transition"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-xs text-slate-400 mt-4">
            EPMS © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}