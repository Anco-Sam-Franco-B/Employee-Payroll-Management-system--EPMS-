import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  KeyRound,
  MapPin,
  Calendar,
  Building2,
  Activity,
  Camera,
} from "lucide-react";

export default function AdminProfile() {
  const [form, setForm] = useState({
    fullName: "Admin User",
    email: "admin@epms.com",
    phone: "+250 7xx xxx xxx",
    role: "Super Admin",
    department: "IT",
    location: "Kigali HQ",
    joinDate: "2025-01-10",
    status: "Active",
    bio: "System administrator responsible for EPMS platform management.",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Admin Profile:", form);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center">

      <div className="w-full max-w-5xl">

        {/* Header Card */}
        <div className="bg-white border rounded-2xl shadow p-6 flex items-center justify-between">

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-xl font-bold">
                A
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                <Camera className="size-4 text-slate-600" />
              </button>
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800">
                {form.fullName}
              </h1>
              <p className="text-slate-500 text-sm">{form.role}</p>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                {form.status}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-slate-500 text-sm">Admin Level</p>
            <p className="text-xl font-bold text-slate-800">Super</p>
          </div>
        </div>

        {/* Content Grid */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
        >

          {/* LEFT - Profile Info */}
          <div className="md:col-span-2 bg-white border rounded-2xl shadow p-6">

            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Full Name */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <User className="size-4" /> Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <Mail className="size-4" /> Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <Phone className="size-4" /> Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <Shield className="size-4" /> Role
                </label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                />
              </div>

              {/* Department */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <Building2 className="size-4" /> Department
                </label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <MapPin className="size-4" /> Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                />
              </div>

              {/* Join Date */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <Calendar className="size-4" /> Join Date
                </label>
                <input
                  type="date"
                  name="joinDate"
                  value={form.joinDate}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm text-slate-600">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-4">
              <label className="text-sm text-slate-600">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="3"
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
              />
            </div>

            {/* Save */}
            <button
              type="submit"
              className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:scale-105 transition"
            >
              Update Profile
            </button>
          </div>

          {/* RIGHT - Security & Activity */}
          <div className="space-y-6">

            {/* Security */}
            <div className="bg-white border rounded-2xl shadow p-5">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <KeyRound className="size-4 text-blue-500" />
                Security
              </h3>

              <button className="w-full text-left text-sm px-3 py-2 bg-slate-100 rounded-xl mb-2">
                Change Password
              </button>

              <button className="w-full text-left text-sm px-3 py-2 bg-slate-100 rounded-xl">
                Enable 2FA
              </button>
            </div>

            {/* Activity */}
            <div className="bg-white border rounded-2xl shadow p-5">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Activity className="size-4 text-green-500" />
                Activity
              </h3>

              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Logged in today</li>
                <li>• Updated payroll settings</li>
                <li>• Created new employee</li>
                <li>• Generated reports</li>
              </ul>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}