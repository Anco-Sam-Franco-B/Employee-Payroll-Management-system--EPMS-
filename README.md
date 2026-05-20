# 💼 Employee Payroll Management System (EPMS)

<div align="center">

![EPMS Badge](https://img.shields.io/badge/EPMS-v1.0.0-3498db?style=for-the-badge&logo=briefcase)
![Build Status](https://img.shields.io/badge/Build-Passing-27ae60?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-f39c12?style=for-the-badge)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-27ae60?style=for-the-badge)

A **modern, full-stack payroll management solution** designed to streamline employee record-keeping, department management, and payroll processing with an intuitive interface and powerful backend architecture.

[🔗 Live Demo](#-quick-links) • [📚 Documentation](#-documentation) • [🤝 Contributing](#-contributing) • [📝 License](#-license)

</div>

---

## 🎯 Overview

**EPMS** is an enterprise-grade payroll management system that enables organizations to efficiently manage their HR and payroll operations. Built with modern web technologies, it provides a seamless experience for administrators to handle departments, employees, salaries, and generate comprehensive reports.

---

## ✨ Key Features

<table>
  <tr>
    <td>
      <h4>📊 Dashboard</h4>
      <p>Real-time statistics, visual insights, and key metrics for company payroll at a glance</p>
    </td>
    <td>
      <h4>🏢 Department Management</h4>
      <p>Create, view, update, and manage company departments with ease</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>👥 Employee Management</h4>
      <p>Comprehensive employee records including profiles, positions, and department assignments</p>
    </td>
    <td>
      <h4>💰 Payroll Processing</h4>
      <p>Automated salary calculations with bonuses, deductions, and net salary computation</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>📄 Report Generation</h4>
      <p>Generate professional reports in PDF, Excel, and CSV formats for analysis</p>
    </td>
    <td>
      <h4>🔐 Authentication</h4>
      <p>Secure JWT-based authentication with role-based access control</p>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🎨 Responsive UI</h4>
      <p>Premium, mobile-friendly interface with Tailwind CSS and smooth animations</p>
    </td>
    <td>
      <h4>⚡ File Upload</h4>
      <p>Support for employee profile uploads with Multer integration</p>
    </td>
  </tr>
</table>

---

## 🛠️ Technology Stack

### Frontend (96.7%)
```
├── React 19 + Vite          - Modern UI framework with fast dev server
├── Tailwind CSS             - Utility-first CSS framework
├── AOS                      - Animate on Scroll for smooth animations
├── Lucide React            - Beautiful icon library
├── Zustand                 - Lightweight state management
├── Framer Motion           - Advanced motion library
├── React Hot Toast         - Toast notifications
├── React Router DOM        - Client-side routing
└── Axios                   - HTTP client for API calls
```

### Backend (Node.js + Express)
```
├── Express.js              - Web framework
├── MySQL2 / PostgreSQL     - Database (dual support)
├── JWT (jsonwebtoken)      - Token-based authentication
├── BcryptJS               - Password hashing
├── Multer                 - File upload middleware
├── PDFKit                 - PDF generation
├── ExcelJS                - Excel file creation
├── JSON2CSV               - CSV conversion
├── Morgan                 - HTTP request logger
├── CORS                   - Cross-origin resource sharing
├── dotenv                 - Environment variable management
└── Cookie Parser          - Cookie handling
```

### Database (3%)
```
├── MySQL Schema           - Primary database (epms-schema-mysql.sql)
└── PostgreSQL Schema      - Alternative database (epms-schema-postgresql.sql)
```

---

## 📋 Project Structure

```
Employee-Payroll-Management-system--EPMS-/
│
├── backend/                           # Node.js Express API
│   ├── src/
│   │   ├── config/
│   │   │   └── Database.js           # MySQL connection setup
│   │   ├── controllers/
│   │   │   ├── Auth.Controller.js    # Authentication logic
│   │   │   ├── Employee.Controller.js # Employee CRUD operations
│   │   │   ├── Department.Controller.js # Department management
│   │   │   ├── Salary.Controller.js  # Payroll calculations
│   │   │   ├── Dashboard.Controller.js # Dashboard statistics
│   │   │   └── Report.Controller.js  # Report generation
│   │   ├── routes/
│   │   │   ├── index.js              # Main routes aggregator
│   │   │   └── routers/
│   │   │       ├── Auth.Routes.js
│   │   │       ├── Employee.Routes.js
│   │   │       ├── Department.Routes.js
│   │   │       ├── Salary.Routes.js
│   │   │       ├── Dashboard.Routes.js
│   │   │       └── Report.Routes.js
│   │   ├── middleware/
│   │   │   ├── Auth.Middleware.js    # JWT verification
│   │   │   └── upload.js             # File upload configuration
│   │   ├── utils/
│   │   │   └── utils.js              # Helper functions
│   │   └── server.js                 # Express app initialization
│   ├── DATABASE/
│   │   ├── epms-schema-mysql.sql     # MySQL schema
│   │   ├── epms-schema-postgresql.sql # PostgreSQL schema
│   │   └── EPMS_ERD_Documentation.pdf # Database design
│   ├── uploads/                      # Employee file uploads
│   ├── package.json                  # Backend dependencies
│   ├── .env                          # Environment variables
│   └── test_db.js                    # Database connection test
│
├── frontend/                         # React + Vite application
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx         # Dashboard view
│   │   │   ├── Departments.jsx       # Department list
│   │   │   ├── Employees.jsx         # Employee list
│   │   │   ├── Salary.jsx            # Payroll management
│   │   │   ├── Reports.jsx           # Report viewing
│   │   │   ├── GenerateReport.jsx    # Report generator
│   │   │   ├── AddEmployee.jsx       # Employee creation
│   │   │   ├── EditEmployee.jsx      # Employee editing
│   │   │   ├── AddDepartment.jsx     # Department creation
│   │   │   ├── EditDepartment.jsx    # Department editing
│   │   │   ├── AuthPage.jsx          # Login page
│   │   │   ├── AdminProfile.jsx      # Admin settings
│   │   │   └── EmployeeProfile.jsx   # Employee details
│   │   ├── Layouts/
│   │   │   └── MainLayouts.jsx       # Main layout wrapper
│   │   ├── store/                    # Zustand state management
│   │   ├── assets/                   # Static files
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── eslint.config.js              # ESLint configuration
│   └── postcss.config.js             # PostCSS configuration
│
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0 or higher
- **npm** v9.0 or higher (or **yarn**)
- **MySQL Server** 8.0+ (or **PostgreSQL** 12+)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/Anco-Sam-Franco-B/Employee-Payroll-Management-system--EPMS-.git
cd Employee-Payroll-Management-system--EPMS-
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=epms

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

#### Setup Database

**For MySQL:**
```bash
mysql -u root -p < DATABASE/epms-schema-mysql.sql
```

**For PostgreSQL:**
```bash
psql -U postgres -f DATABASE/epms-schema-postgresql.sql
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

### Step 4: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

Backend will be running at `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Frontend will be running at `http://localhost:5173`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Routes
```
POST   /auth/register      - Register new admin
POST   /auth/login         - Admin login (returns JWT token)
GET    /auth/profile       - Get current admin profile
```

### Employee Routes
```
GET    /employee           - Get all employees
GET    /employee/:empId    - Get employee details
GET    /employee/dept/:depId - Get employees by department
POST   /employee/:depId    - Create new employee
PUT    /employee/:empId    - Update employee
DELETE /employee/:empId    - Delete employee
```

### Department Routes
```
GET    /department         - Get all departments
GET    /department/:depId  - Get department details
POST   /department         - Create new department
PUT    /department/:depId  - Update department
DELETE /department/:depId  - Delete department
```

### Salary Routes
```
GET    /salary            - Get all salary records
POST   /salary            - Create salary record
PUT    /salary/:salId     - Update salary
DELETE /salary/:salId     - Delete salary
```

### Report Routes
```
GET    /report/history    - Get report history
POST   /report/pdf        - Generate PDF report
POST   /report/excel      - Generate Excel report
POST   /report/csv        - Generate CSV report
GET    /report/download/:id - Download report
```

### Dashboard Routes
```
GET    /dashboard/stats   - Get dashboard statistics
```

---

## 🔐 Authentication

The system uses **JWT (JSON Web Tokens)** for secure authentication:

1. Admin logs in with credentials
2. Backend generates and returns JWT token
3. Token is stored in localStorage
4. Token is sent in Authorization header for protected routes
5. Middleware verifies token before processing request

**Protected Routes**: All routes except `/auth/login` and `/auth/register` require valid JWT token.

---

## 📊 Database Schema

### Main Tables

#### employees
```sql
- id (PK)
- emp_number (Unique employee ID)
- fname (First name)
- lname (Last name)
- position
- address
- telephone
- gender
- hered_date (Hire date)
- status (Active/Inactive)
- dep_id (FK - Department)
- create_at
```

#### departments
```sql
- id (PK)
- dep_code (Unique department code)
- dep_name
- gross_salary
- total_deduction
```

#### salary
```sql
- id (PK)
- emp_id (FK - Employee)
- basic_salary
- allowances
- deductions
- net_salary
- payment_date
```

#### reports
```sql
- id (PK)
- title
- type (Employee/Payroll/etc)
- format (PDF/Excel/CSV)
- file_name
- file_path
- generated_by
- created_at
```

---

## 🎨 Features in Detail

### Dashboard
- **Total Employees**: Count of all employees
- **Total Departments**: Count of departments
- **Total Payroll**: Sum of all net salaries
- **Recent Activities**: Latest 5 employee additions
- **Department Distribution**: Visual breakdown by department

### Employee Management
- Add new employees with complete information
- Edit employee details
- View employee profiles
- Delete employees
- Search and filter employees
- Upload employee documents

### Department Management
- Create departments with salary budgets
- Manage department codes
- Track departmental deductions
- View employees by department

### Payroll System
- Automatic salary calculations
- Basic pay, allowances, deductions
- Net salary computation
- Payroll history tracking
- Payment processing

### Report Generation
- **PDF Reports**: Professional payroll reports
- **Excel Reports**: Spreadsheet format for analysis
- **CSV Reports**: Compatible with external systems
- Date range filtering
- Department-specific reports
- Download generated reports

---

## ⚙️ Configuration

### Frontend Configuration (`vite.config.js`)
```javascript
// Change API endpoint as needed
const API_BASE_URL = 'http://localhost:5000/api/v1';
```

### Backend Configuration (`package.json`)
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Database Configuration (`src/config/Database.js`)
```javascript
// Edit host, user, password, database as per your setup
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

### Database Connection Error
```bash
# Check MySQL/PostgreSQL is running
mysql -u root -p
# or
psql -U postgres
```

### CORS Issues
```bash
# Backend has CORS enabled for localhost:5173
# For production, update in server.js
app.use(cors({
  origin: 'https://your-domain.com'
}));
```

### JWT Token Expired
- Re-login to get new token
- Token expiry set in .env (default: 7 days)

---

## 🚀 Performance Optimization

- ✅ Database connection pooling recommended
- ✅ Implement pagination for large datasets
- ✅ Add database indexes on foreign keys
- ✅ Frontend code splitting with React lazy loading
- ✅ Implement caching for dashboard statistics
- ✅ Use async operations for report generation

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Use consistent naming conventions
- Comment complex logic
- Follow existing code patterns
- Maintain consistent indentation

---

## 📝 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

```
ISC License

Copyright (c) 2026 Sam Franco BYIRINGIRO

Permission to use, copy, modify, and/or distribute this software for any 
purpose with or without fee is hereby granted, provided that the above 
copyright notice and this permission notice appear in all copies.
```

---

## 👨‍💻 Author

**Sam Franco BYIRINGIRO**
- 🔗 [GitHub Profile](https://github.com/Anco-Sam-Franco-B)
- 📧 Email: [Contact]
- 💼 LinkedIn: [Profile]

---

## 📞 Support & Contact

For questions, issues, or suggestions:

- 📋 **Issues**: [GitHub Issues](https://github.com/Anco-Sam-Franco-B/Employee-Payroll-Management-system--EPMS-/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Anco-Sam-Franco-B/Employee-Payroll-Management-system--EPMS-/discussions)
- 📧 **Email**: Your email here

---

## 🙏 Acknowledgments

- Thanks to all contributors and users
- Built with modern web technologies
- Inspired by real-world HR needs
- Special thanks to the open-source community

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star! ⭐

**Made with ❤️ by Sam Franco BYIRINGIRO**

[Back to Top](#-employee-payroll-management-system-epms)

</div>
