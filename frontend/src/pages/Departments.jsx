import { Building2, Plus, Users, Pencil, Trash2, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Departments() {
  const departments = [
    { name: "Human Resources", employees: 24 },
    { name: "Finance", employees: 18 },
    { name: "IT Support", employees: 32 },
    { name: "Marketing", employees: 15 },
    { name: "Operations", employees: 40 },
  ];

  return (
    <div className="p-6 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Departments
          </h1>
          <p className="text-slate-500 text-sm">
            Manage company departments and teams
          </p>
        </div>

        <Link to='/create-department' className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:scale-105 transition">
          <Plus className="size-4" />
          Add Department
        </Link>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {departments.map((dept, index) => (
          <div
            key={index}
            data-aos="fade-in"
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition group"
          >
            {/* Icon + Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-green-500 transition">
                  <Building2 className="text-blue-600 group-hover:text-white" />
                </div>

                <h2 className="font-semibold text-slate-800">
                  {dept.name}
                </h2>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
              <Users className="size-4" />
              <span>{dept.employees} Employees</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-5">
              <button className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
                <Pencil className="size-4" />
                Edit
              </button>

              <button className="flex items-center gap-2 text-blue-500 text-sm px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-slate-200 transition">
                <PlusIcon className="size-4" />
                Employee
              </button>

              <button className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}