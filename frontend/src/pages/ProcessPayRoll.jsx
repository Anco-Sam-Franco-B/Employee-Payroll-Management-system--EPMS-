import { useState } from "react";
import {
  User,
  Building2,
  Calendar,
  DollarSign,
  Percent,
  Banknote,
  Calculator,
} from "lucide-react";

export default function ProcessPayrollForm() {
  const [form, setForm] = useState({
    employee: "",
    department: "All",
    month: "",
    basicSalary: 0,
    bonus: 0,
    allowance: 0,
    deduction: 0,
    tax: 0,
    paymentMethod: "Bank Transfer",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const netSalary =
    Number(form.basicSalary) +
    Number(form.bonus) +
    Number(form.allowance) -
    Number(form.deduction) -
    Number(form.tax);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payroll Data:", form);
    console.log("Net Salary:", netSalary);
  };

  return (
    <div className="min-h-screen  p-6 flex items-center justify-center">

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
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <User className="size-4" /> Employee
            </label>
            <input
              name="employee"
              value={form.employee}
              onChange={handleChange}
              placeholder="Employee name"
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 outline-none"
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
              <option>All</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
          </div>

          {/* Month */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Calendar className="size-4" /> Payroll Month
            </label>
            <input
              type="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Basic Salary */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <DollarSign className="size-4" /> Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              value={form.basicSalary}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Bonus */}
          <div>
            <label className="text-sm text-slate-600">Bonus</label>
            <input
              type="number"
              name="bonus"
              value={form.bonus}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Allowance */}
          <div>
            <label className="text-sm text-slate-600">Allowance</label>
            <input
              type="number"
              name="allowance"
              value={form.allowance}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Deduction */}
          <div>
            <label className="text-sm text-slate-600">Deduction</label>
            <input
              type="number"
              name="deduction"
              value={form.deduction}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Tax */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Percent className="size-4" /> Tax
            </label>
            <input
              type="number"
              name="tax"
              value={form.tax}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm text-slate-600 flex items-center gap-1">
              <Banknote className="size-4" /> Payment Method
            </label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100"
            >
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Mobile Money</option>
            </select>
          </div>
        </div>

        {/* Net Salary Preview */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 border">
          <h2 className="text-sm text-slate-600">Net Salary</h2>
          <p className="text-2xl font-bold text-slate-800">
            ${netSalary}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 transition"
        >
          Process Payroll
        </button>
      </form>
    </div>
  );
}