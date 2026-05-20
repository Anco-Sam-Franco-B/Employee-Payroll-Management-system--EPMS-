import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Initialize token from localStorage
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  departments: [],
  employees: [],
  salaries: [],
  stats: null,
  isLoading: false,
  isAuthenticated: localStorage.getItem('auth') || false,

  // Auth
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth', true)
      
      // Set default header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, isLoading: false }); 
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.log(error.response)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
      
    }
  },

  signup: async (username, email, password) => {
    set({ isLoading: true });
    try {
      await api.post('/auth/signup', { username, email, password });
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || 'Signup failed' 
      };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('auth')
    delete api.defaults.headers.common['Authorization'];
    set({ user: null });
  },

  updateProfile: async (profileData) => {
    set({ isLoading: true });
    try {
      const response = await api.put('/auth/profile', profileData);
      const { user } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  },

  changePassword: async (passwords) => {
    set({ isLoading: true });
    try {
      await api.put('/auth/change-password', passwords);
      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to change password' 
      };
    }
  },

  uploadAvatar: async (file) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.post('/auth/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const { avatar } = response.data;
      const updatedUser = { ...get().user, avatar };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser, isLoading: false });
      
      return { success: true, avatar };
    } catch (error) {
      set({ isLoading: false });
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to upload avatar' 
      };
    }
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
      set({ departments: response.data.depData, isLoading: false });
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
      const response = await api.get(`/department/${id}`);
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
      set({ employees: response.data.empData, isLoading: false });
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
      const response = await api.get(`/employee/${id}`);
      set({ isLoading: false });
      return response.data.empData[0];
    } catch (error) {
      console.log(error.response)
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
