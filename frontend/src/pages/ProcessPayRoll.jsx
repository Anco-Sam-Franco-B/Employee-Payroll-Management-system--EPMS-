import { useState, useEffect, useMemo } from "react";
import {
  User,
  Building2,
  Calendar,
  DollarSign,
  Calculator,
  Loader2,
} from "lucide-react";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
 
export default function ProcessPayrollForm() {
  const { employees, departments, fetchEmployees, fetchDepartments, processPayroll, isLoading } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    empId: "",
    depId: "",
    month: new Date().toISOString().slice(0, 7), // YYYY-MM
    basic: 0,
    bonus: 0,
    deduction: 0,
  });

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, [fetchEmployees, fetchDepartments]);

  const selectedEmployee = useMemo(() => {
    return employees.find(e => e.id.toString() === form.empId.toString());
  }, [employees, form.empId]);

  const selectedDepartment = useMemo(() => {
    return departments.find(d => d.id.toString() === form.depId.toString());
  }, [departments, form.depId]);

  // Update department and salary when employee changes
  useEffect(() => {
    if (selectedEmployee) {
      const dept = departments.find(d => d.id === selectedEmployee.dep_id);
      if (dept) {
        setForm(prev => ({
          ...prev,
          depId: dept.id,
          basic: dept.gross_salary,
          deduction: dept.total_deduction
        }));
      }
    }
  }, [selectedEmployee, departments]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const netSalary =
    Number(form.basic) +
    Number(form.bonus) -
    Number(form.deduction);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.empId || !form.depId || !form.month) {
      return toast.error("Please fill in all required fields");
    }

    const res = await processPayroll(form);
    if (res.success) {
      toast.success("Payroll processed successfully!");
      navigate("/salary");
    } else {
      toast.error(res.message || "Failed to process payroll");
    }
  };

  if (isLoading && (employees.length === 0 || departments.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white border rounded-2xl shadow-xl p-6"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Calculator className="text-blue-500" />
            Process Payroll
          </h1>
          <p className="text-slate-500 text-sm">
            Calculate and process employee salary
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee */}
          <div>
            <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
              <User className="size-4" /> Employee
            </label>
            <select
              name="empId"
              required
              value={form.empId}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.fname} {emp.lname} ({emp.emp_number})
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
              <Building2 className="size-4" /> Department
            </label>
            <input
              readOnly
              value={selectedDepartment?.dep_name || "Select Employee first"}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border outline-none"
            />
          </div>

          {/* Month */}
          <div>
            <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
              <Calendar className="size-4" /> Payroll Month
            </label>
            <input
              type="month"
              name="month"
              required
              value={form.month}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Basic Salary */}
          <div>
            <label className="text-sm text-slate-600 font-medium flex items-center gap-1">
              <DollarSign className="size-4" /> Basic Salary
            </label>
            <input
              type="number"
              name="basic"
              readOnly
              value={form.basic}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border outline-none"
            />
          </div>

          {/* Bonus */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Bonus</label>
            <input
              type="number"
              name="bonus"
              value={form.bonus}
              onChange={handleChange}
              placeholder="0"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Deduction */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Deduction</label>
            <input
              type="number"
              name="deduction"
              readOnly
              value={form.deduction}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border outline-none"
            />
          </div>
        </div>

        {/* Net Salary Preview */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 border">
          <h2 className="text-sm text-slate-600 font-medium">Net Salary Preview</h2>
          <p className="text-2xl font-bold text-slate-800">
            ${netSalary.toLocaleString()}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !form.empId}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin size-4" />}
          {isLoading ? "Processing..." : "Confirm & Process Payroll"}
        </button>
      </form>
    </div>
  );
}