import { ArrowLeft, Loader2, Plus } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore';
import toast, { ToastIcon } from 'react-hot-toast';

function EmployeeProfile() {
    const {id}=useParams()
    const [empData, setEmpData]=useState({
        fname: "",
        lname: "",
        position: "",
        address: "",
        telphone: "",
        gender: "",
        heredDate: "",
        depId: "",
        status: "",
    })
    const { fetchEmployeeById, isLoading } = useStore();
    const navigate=useNavigate()
    useEffect(() => {
        const loadEmployee = async () => {
        const emp = await fetchEmployeeById(id);
        ToastIcon
        if (emp) {
            setEmpData({
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
    fetchEmployeeById()
  }, [id , fetchEmployeeById, navigate]);

    if (isLoading && !empData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-blue-500" />
      </div>
    );
  }

  console.log(id)
  return (
    <div className='p-6 min-h-screen text-xs'>
        <div data-aos='fade-down' className="flex justify-between flex-row-reverse items-center mb-6">
            <Link to="/employees" className="flex items-center gap-2 text-slate-500 hover:text-blue-500 mb-4 transition w-fit">
            <ArrowLeft className="size-4" />
            Back To Employee
         </Link>
            <div>
            <h1 className="text-2xl font-bold text-slate-800">Employees Profile</h1>
            <p className="text-slate-500 text-sm">Manage employee profile</p>
            </div>
      </div>
      <div data-aos='fade-right' className="w-full bg-white rounded-2xl  shadow-md p-4">
        <div  className="flex gap-2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                        
            </div>
            <div className="">
                <h1 className='text-2xl font-bold text-gray-700'></h1>
                <h2>Number: </h2>
                <h2>Role: Manager</h2>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile