import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Shield,
} from "lucide-react";

export default function AddEmployeeForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "IT",
    role: "",
    joinDate: "",
    address: "",
    salary: "",
    status: "Active",
    gender: "Male",
    employeeType: "Full-time",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Data:", form);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white border rounded-2xl shadow-xl p-6"
      >

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <User className="text-blue-500" />
            Add New Employee
          </h1>
          <p className="text-slate-500 text-sm">
            Fill in employee details to register in EPMS
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Full Name */}
          <div>
            <label className="text-sm text-slate-600">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Mail className="size-4" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
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
              placeholder="+250 7xx xxx xxx"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
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
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
              <option>Operations</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Briefcase className="size-4" /> Role
            </label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Software Engineer"
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

          {/* Salary */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <DollarSign className="size-4" /> Salary
            </label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="1000"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-slate-600">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Employee Type */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Shield className="size-4" /> Employee Type
            </label>
            <select
              name="employeeType"
              value={form.employeeType}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Intern</option>
            </select>
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

        {/* Address */}
        <div className="mt-4">
          <label className="text-sm text-slate-600 flex items-center gap-1">
            <MapPin className="size-4" /> Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            placeholder="Kigali, Rwanda..."
            className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 transition"
        >
          Save Employee
        </button>
      </form>
    </div>
  );
}