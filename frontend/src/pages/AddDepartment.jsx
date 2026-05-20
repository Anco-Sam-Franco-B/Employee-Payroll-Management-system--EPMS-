import { useState } from "react";
import {
  Building2,
  DollarSign,
  Briefcase,
  Loader2,
} from "lucide-react";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddDepartmentForm() {
  const { addDepartment, isLoading } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    depCode: "",
    depName: "",
    grossSalary: "",
    totalDeduction: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.depName  || !form.depCode || !form.grossSalary || !form.totalDeduction) {
      return toast.error("Please fill in all required fields");
    }

    const res = await addDepartment(form);
    if (res.success) {
      toast.success("Department created successfully!");
      navigate("/departments");
    } else {
      toast.error(res.message || "Failed to create department");
    }
  };

  return (
    <div data-aos='fade-down' className="min-h-screen p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white border rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="text-blue-500" />
            Add New Department
          </h1>
          <p className="text-slate-500 text-sm">
            Define department name and base salary rules
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department Name */}
              <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                  <Briefcase className="size-4" /> Department Name
                </label>
                <input
                  name="depName"
                  required
                  value={form.depName}
                  onChange={handleChange}
                  placeholder="e.g. Engineering, Sales, HR"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Department code */}
              <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                  <Briefcase className="size-4" /> Department Code
                </label>
                <input
                  name="depCode"
                  required
                  value={form.depCode}
                  onChange={handleChange}
                  placeholder="e.g. HR, CW"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gross Salary */}
            <div>
              <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                <DollarSign className="size-4" /> Base Gross Salary
              </label>
              <input
                type="number"
                name="grossSalary"
                required
                value={form.grossSalary}
                onChange={handleChange}
                placeholder="5000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Total Deduction */}
            <div>
              <label className="text-sm text-slate-600 font-medium flex items-center gap-1 mb-1">
                <DollarSign className="size-4" /> Standard Deduction
              </label>
              <input
                type="number"
                name="totalDeduction"
                required
                value={form.totalDeduction}
                onChange={handleChange}
                placeholder="500"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin size-5" />}
          {isLoading ? "Creating..." : "Save Department"}
        </button>
      </form>
    </div>
  );
}