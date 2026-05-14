import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  departments: [],
  employees: [],
  salaries: [],
  stats: null,
  isLoading: false,

  // Auth
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // For now, allow any admin login if backend auth isn't fully ready
      const user = { email, role: 'admin', name: 'Admin User' };
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: 'Login failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  // Dashboard Stats
  fetchStats: async () => {
    try {
      const response = await api.get('/dashboard/stats');
      set({ stats: response.data });
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  },

  // Departments
  fetchDepartments: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/department');
      set({ departments: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  addDepartment: async (depData) => {
    try {
      await api.post('/department/create', depData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add department' };
    }
  },

  updateDepartment: async (id, depData) => {
    try {
      await api.put(`/department/update/${id}`, depData);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to update department' };
    }
  },

  deleteDepartment: async (id) => {
    try {
      await api.delete(`/department/delete/${id}`);
      set((state) => ({
        departments: state.departments.filter((d) => d.id !== id),
      }));
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  fetchDepartmentById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/department/details/${id}`);
      set({ isLoading: false });
      return response.data.depData[0];
    } catch (error) {
      set({ isLoading: false });
      return null;
    }
  },

  // Employees
  fetchEmployees: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/employee');
      set({ employees: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  addEmployee: async (depId, empData) => {
    try {
      await api.post(`/employee/create/${depId}/emp`, empData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add employee' };
    }
  },

  updateEmployee: async (id, empData) => {
    try {
      await api.put(`/employee/update/${id}`, empData);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to update employee' };
    }
  },

  deleteEmployee: async (id) => {
    try {
      await api.delete(`/employee/delete/${id}`);
      set((state) => ({
        employees: state.employees.filter((e) => e.id !== id),
      }));
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  fetchEmployeeById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/employee/details/${id}`);
      set({ isLoading: false });
      return response.data.empData[0];
    } catch (error) {
      set({ isLoading: false });
      return null;
    }
  },

  // Salary
  fetchSalaries: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/salary');
      set({ salaries: response.data.salaryData, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  processPayroll: async (payrollData) => {
    try {
      await api.post('/salary/process', payrollData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to process payroll' };
    }
  },

  // Reports
  generateReport: async (reportData) => {
    try {
      const response = await api.post('/report/multi-save', reportData);
      return { success: true, downloadUrl: response.data.downloadUrl };
    } catch (error) {
      return { success: false, message: 'Failed to generate report' };
    }
  },
}));
