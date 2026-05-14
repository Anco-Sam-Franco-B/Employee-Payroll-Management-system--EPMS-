import { useState, useEffect, useRef } from "react";
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

import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const { user, logout, updateProfile, changePassword, uploadAvatar, isLoading } = useStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "Super Admin",
    department: user?.department || "",
    location: user?.location || "",
    status: user?.status || "Active",
    bio: user?.bio || "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "Super Admin",
        department: user.department || "",
        location: user.location || "",
        status: user.status || "Active",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/Auth");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(form);
    if (result.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(result.message);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await uploadAvatar(file);
      if (result.success) {
        toast.success("Avatar updated!");
      } else {
        toast.error(result.message);
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const result = await changePassword(passwords);
    if (result.success) {
      toast.success("Password changed successfully!");
      setIsPassModalOpen(false);
      setPasswords({ oldPassword: "", newPassword: "" });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header Card */}
        <div className="bg-white border rounded-2xl shadow p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={`http://localhost:5000${user.avatar}`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  form.username.charAt(0).toUpperCase()
                )}
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Camera className="size-6 text-white" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800">
                {form.username}
              </h1>
              <p className="text-slate-500 text-sm">{form.role}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${form.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {form.status}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-slate-500 text-sm">Admin Level</p>
            <p className="text-xl font-bold text-slate-800">{form.role.split(' ')[0]}</p>
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
              {/* Username */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <User className="size-4" /> Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                  <Mail className="size-4" /> Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
                  required
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
                  placeholder="+250 7xx xxx xxx"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm text-slate-600 flex items-center gap-1">
                   <Activity className="size-4" /> Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Profile"}
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
              <button 
                type="button"
                onClick={() => setIsPassModalOpen(true)}
                className="w-full text-left text-sm px-3 py-2 bg-slate-100 rounded-xl mb-2 hover:bg-slate-200 transition"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left text-sm px-3 py-2 bg-red-50 text-red-600 rounded-xl mt-4 font-semibold hover:bg-red-100 transition"
              >
                Logout Account
              </button>
            </div>

            {/* Activity */}
            <div className="bg-white border rounded-2xl shadow p-5">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Activity className="size-4 text-green-500" />
                System Info
              </h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Role: {form.role}</li>
                <li>• Status: {form.status}</li>
                <li>• Last Login: Today</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}