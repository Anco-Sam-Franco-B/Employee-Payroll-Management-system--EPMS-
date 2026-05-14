import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Hash,
  DollarSign,
  Calendar,
  FileText,
  Shield,
} from "lucide-react";

export default function AddDepartmentForm() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    manager: "",
    email: "",
    phone: "",
    budget: "",
    location: "",
    description: "",
    establishedDate: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Department Data:", form);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white border rounded-2xl shadow-xl p-6"
      >

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="text-blue-500" />
            Add New Department
          </h1>
          <p className="text-slate-500 text-sm">
            Create and manage company departments in EPMS
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Department Name */}
          <div>
            <label className="text-sm text-slate-600">
              Department Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Human Resources"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Department Code */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Hash className="size-4" /> Department Code
            </label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="HR-001"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Manager */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <User className="size-4" /> Department Manager
            </label>
            <input
              name="manager"
              value={form.manager}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Manager Email */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Mail className="size-4" /> Manager Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="manager@company.com"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-slate-600">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+250 7xx xxx xxx"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <DollarSign className="size-4" /> Department Budget
            </label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="50000"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-slate-600">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Head Office - Kigali"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Established Date */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Calendar className="size-4" /> Established Date
            </label>
            <input
              type="date"
              name="establishedDate"
              value={form.establishedDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Shield className="size-4" /> Status
            </label>
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

        {/* Description */}
        <div className="mt-4">
          <label className="text-sm text-slate-600 flex items-center gap-1">
            <FileText className="size-4" /> Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe department responsibilities..."
            className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 transition"
        >
          Save Department
        </button>
      </form>
    </div>
  );
}