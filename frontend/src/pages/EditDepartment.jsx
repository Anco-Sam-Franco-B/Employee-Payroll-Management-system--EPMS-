import { useState, useEffect } from "react";
import {
  Building2,
  Code,
  DollarSign,
  TrendingDown,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditDepartmentForm() {
  const { id } = useParams();
  const { updateDepartment, fetchDepartmentById, isLoading } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    depCode: "",
    depName: "",
    grossSalary: "",
    totalDeduction: "",
  });

  useEffect(() => {
    const loadDepartment = async () => {
      const dep = await fetchDepartmentById(id);
      if (dep) {
        setForm({
          depCode: dep.dep_code,
          depName: dep.dep_name,
          grossSalary: dep.gross_salary,
          totalDeduction: dep.total_deduction,
        });
      } else {
        toast.error("Department not found");
        navigate("/departments");
      }
    };
    loadDepartment();
  }, [id, fetchDepartmentById, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateDepartment(id, form);
    if (res.success) {
      toast.success("Department updated successfully!");
      navigate("/departments");
    } else {
      toast.error(res.message || "Failed to update department");
    }
  };

  if (isLoading && !form.depName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
         <Link to="/departments" className="flex items-center gap-2 text-slate-500 hover:text-blue-500 mb-4 transition w-fit">
            <ArrowLeft className="size-4" />
            Back to Departments
         </Link>

        <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-2xl shadow-xl p-8"
        >
            {/* Header */}
            <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="text-blue-500" />
                Edit Department
            </h1>
            <p className="text-slate-500 text-sm">
                Update details for {form.depName}
            </p>
            </div>

            <div className="space-y-4">
            {/* Dept Code */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <Code className="size-4" /> Dept Code
                </label>
                <input
                name="depCode"
                required
                value={form.depCode}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Dept Name */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <Building2 className="size-4" /> Dept Name
                </label>
                <input
                name="depName"
                required
                value={form.depName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Gross Salary */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <DollarSign className="size-4" /> Default Gross Salary
                </label>
                <input
                type="number"
                name="grossSalary"
                required
                value={form.grossSalary}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>

            {/* Total Deduction */}
            <div>
                <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
                <TrendingDown className="size-4" /> Default Deduction
                </label>
                <input
                type="number"
                name="totalDeduction"
                required
                value={form.totalDeduction}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
                />
            </div>
            </div>

            {/* Submit */}
            <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
            {isLoading && <Loader2 className="animate-spin size-4" />}
            {isLoading ? "Saving..." : "Update Department"}
            </button>
        </form>
      </div>
    </div>
  );
}
