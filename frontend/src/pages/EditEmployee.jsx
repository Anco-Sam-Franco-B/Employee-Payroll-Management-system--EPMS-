import { useState, useEffect } from "react";
import {
  User,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditEmployeeForm() {
  const { id } = useParams();
  const { departments, fetchDepartments, updateEmployee, fetchEmployeeById, isLoading } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    position: "",
    address: "",
    telphone: "",
    gender: "Male",
    heredDate: "",
    depId: "",
    status: "Active",
  });

  useEffect(() => {
    fetchDepartments();
    const loadEmployee = async () => {
      const emp = await fetchEmployeeById(id);
      if (emp) {
        setForm({
          fname: emp.fname,
          lname: emp.lname,
          position: emp.position,
          address: emp.address,
          telphone: emp.telephone,
          gender: emp.gender,
          heredDate: emp.hered_date ? emp.hered_date.split("T")[0] : "",
          depId: emp.dep_id,
          status: emp.status || "Active",
        });
      } else {
        toast.error("Employee not found");
        navigate("/employees");
      }
    };
    loadEmployee();
  }, [id, fetchDepartments, fetchEmployeeById, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateEmployee(id, form);
    if (res.success) {
      toast.success("Employee updated successfully!");
      navigate("/employees");
    } else {
      toast.error(res.message || "Failed to update employee");
    }
  };

  if (isLoading && !form.fname) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl">
         <Link to="/employees" className="flex items-center gap-2 text-slate-500 hover:text-blue-500 mb-4 transition w-fit">
            <ArrowLeft className="size-4" />
            Back to Employees
         </Link>
        
        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-2xl shadow-xl p-6"
        >
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <User className="text-blue-500" />
                Edit Employee
            </h1>
            <p className="text-slate-500 text-sm">
                Update details for {form.fname} {form.lname}
            </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* First Name */}
            <div>
                <label className="text-sm text-slate-600 font-medium">First Name</label>
                <input
                name="fname"
                required
                value={form.fname}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Last Name */}
            <div>
                <label className="text-sm text-slate-600 font-medium">Last Name</label>
                <input
                name="lname"
                required
                value={form.lname}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Phone */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <Phone className="size-4" /> Phone
                </label>
                <input
                name="telphone"
                required
                value={form.telphone}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Department */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <Building2 className="size-4" /> Department
                </label>
                <select
                name="depId"
                required
                value={form.depId}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                >
                {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                    {dept.dep_name}
                    </option>
                ))}
                </select>
            </div>

            {/* Role */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <Briefcase className="size-4" /> Role
                </label>
                <input
                name="position"
                required
                value={form.position}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Join Date */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <Calendar className="size-4" /> Join Date
                </label>
                <input
                type="date"
                name="heredDate"
                required
                value={form.heredDate}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Gender */}
            <div>
                <label className="text-sm text-slate-600 font-medium">Gender</label>
                <select
                name="gender"
                required
                value={form.gender}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                >
                <option>Male</option>
                <option>Female</option>
                </select>
            </div>

            {/* Status */}
            <div>
                <label className="text-sm text-slate-600 font-medium">Status</label>
                <select
                name="status"
                required
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                >
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
                </select>
            </div>
            </div>

            {/* Address */}
            <div className="mt-4">
            <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <MapPin className="size-4" /> Address
            </label>
            <textarea
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                rows="3"
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
            />
            </div>

            {/* Submit */}
            <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
            {isLoading && <Loader2 className="animate-spin size-4" />}
            {isLoading ? "Saving..." : "Update Employee"}
            </button>
        </form>
      </div>
    </div>
  );
}
