import { Building2, Plus, Users, Pencil, Trash2, PlusIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../store/useStore";
import toast from "react-hot-toast";

export default function Departments() {
  const { departments, fetchDepartments, deleteDepartment, isLoading } = useStore();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      const res = await deleteDepartment(id);
      if (res.success) {
        toast.success("Department deleted successfully");
      } else {
        toast.error("Failed to delete department");
      }
    }
  };

  if (isLoading && departments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin size-8 text-blue-500" />
      </div>
    );
  }

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
        {departments.length === 0 ? (
          <div className="col-span-full text-center py-10 text-slate-500">
            No departments found.
          </div>
        ) : (
          departments.map((dept) => (
            <div
              key={dept.id}
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
                    {dept.dep_name}
                  </h2>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
                <Users className="size-4" />
                <span>{dept.dep_code}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-5">
                <Link to={`/edit-department/${dept.id}`} className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition">
                  <Pencil className="size-4" />
                  Edit
                </Link>

                <Link to={`/dep/${dept.id}/emp`} className="flex items-center gap-2 text-blue-500 text-sm px-3 py-1.5 rounded-lg bg-blue-100 hover:bg-slate-200 transition">
                  <PlusIcon className="size-4" />
                  View
                </Link>

                <button 
                  onClick={() => handleDelete(dept.id)}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}