# Employee Payroll Management System (EPMS) 🚀

A modern, full-stack payroll management solution designed to streamline employee record-keeping, department management, and payroll processing.

![Banner](https://img.shields.io/badge/EPMS-Premium-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Key Features

- **Dashboard**: Real-time statistics and visual insights into company payroll.
- **Department Management**: Create, view, and manage company departments with ease.
- **Employee Management**: Comprehensive records for all employees including position, contact info, and department.
- **Payroll Processing**: Automated salary calculation with basic pay, bonuses, and deductions.
- **Reports**: Generate and download professional reports in PDF, Excel, and CSV formats.
- **Authentication**: Secure admin login and profile management.
- **Responsive Design**: Premium UI built with Tailwind CSS and Framer Motion for smooth animations.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS, AOS (Animate on Scroll)
- **Icons**: Lucide React
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL / PostgreSQL
- **Auth**: JSON Web Tokens (JWT) & BcryptJS
- **Reporting**: PDFKit, ExcelJS

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anco-Sam-Franco-B/Employee-Payroll-Management-system--EPMS-.git
   cd Employee-Payroll-Management-system--EPMS-
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` folder:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=your_password
     DB_NAME=epms
     JWT_SECRET=your_super_secret_key
     ```
   - Import the database schema from `backend/DATABASE/epms-schema-mysql.sql`.

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Project

- **Start Backend**: `cd backend && npm run dev`
- **Start Frontend**: `cd frontend && npm run dev`

## 📸 Screenshots

*(Add screenshots here after implementation)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

---
Created with ❤️ by **Sam Franco BYIRINGIRO**
