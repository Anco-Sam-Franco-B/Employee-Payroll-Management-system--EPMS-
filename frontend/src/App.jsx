import React ,{ useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import MainLayouts from './Layouts/MainLayouts'
import NotFound from './pages/NotFound'
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from './pages/Dashboard'
import Departments from './pages/Departments'
import Employees from './pages/Employees'
import SalaryPage from './pages/Salary'
import Reports from './pages/Reports'
import ReportForm from './pages/GenerateReport'
import ProcessPayrollForm from './pages/ProcessPayRoll'
import AddEmployeeForm from './pages/AddEmployee'
import AddDepartmentForm from './pages/AddDepartment'
import EditEmployeeForm from './pages/EditEmployee'
import EditDepartmentForm from './pages/EditDepartment'
import AdminProfile from './pages/AdminProfile'
import EmployeeProfile from './pages/EmployeeProfile'

function App() {

 useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // animate only once
      offset: 100,    // trigger offset
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayouts/>}>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/departments' element={<Departments/>} />
            <Route path='/employees' element={<Employees/>}/>
            <Route path='/salary' element={<SalaryPage/>} />
            <Route path='/reports' element={<Reports/>} />
            <Route path='/generate-report' element={<ReportForm/>} />
            <Route path='/process-payroll' element={<ProcessPayrollForm/>}/>
            <Route path='/create-employee' element={<AddEmployeeForm/>} />
            <Route path='/create-department' element={<AddDepartmentForm/>} />
            <Route path='/edit-employee/:id' element={<EditEmployeeForm/>} />
            <Route path='/employee/profile/:empNumber/ID/:id' element={<EmployeeProfile/>} />
            <Route path='/edit-department/:id' element={<EditDepartmentForm/>} />
            <Route path='/profile' element={<AdminProfile/>} />
        </Route>
        <Route path='/Auth' element={<AuthPage/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App