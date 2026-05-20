# Contributing to Employee Payroll Management System (EPMS)

Thank you for contributing to the Employee Payroll Management System (EPMS). We welcome contributions that improve the platform, fix bugs, enhance security, optimize performance, or improve documentation.

---

## Table of Contents

- Getting Started
- Development Workflow
- Project Structure
- Coding Standards
- Commit Message Convention
- Pull Request Process
- Reporting Bugs
- Suggesting Features
- Security Vulnerabilities
- License

---

# Getting Started

## 1. Fork the Repository

Fork the repository and clone it locally.

```bash
git clone https://github.com/YOUR_USERNAME/Employee-Payroll-Management-system--EPMS-.git
```

---

## 2. Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create `.env` files inside backend and frontend directories.

Example backend `.env`:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## 4. Start Development Servers

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# Development Workflow

1. Create a feature branch.

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes.
3. Test your changes.
4. Commit using conventional commit messages.
5. Push your branch.
6. Create a Pull Request.

---

# Project Structure

```txt
backend/
 ├── src/
 │    ├── controllers/
 │    ├── routes/
 │    ├── middleware/
 │    ├── services/
 │    ├── models/
 │    ├── config/
 │    └── utils/

frontend/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── layouts/
 │    ├── hooks/
 │    ├── services/
 │    └── utils/
```

---

# Coding Standards

## Backend

- Use async/await
- Use layered architecture
- Validate all request inputs
- Keep controllers lightweight
- Use environment variables for secrets

## Frontend

- Use reusable components
- Follow responsive design principles
- Use Tailwind CSS consistently
- Avoid duplicated logic

---

# Commit Message Convention

Use conventional commits.

Examples:

```bash
feat: add payroll generation module
fix: resolve login token issue
refactor: optimize payroll calculations
docs: update deployment guide
```

---

# Pull Request Process

Before submitting a PR:

- Ensure code builds successfully
- Ensure no sensitive information is committed
- Ensure linting passes
- Update documentation if necessary
- Add screenshots for UI changes

PRs should include:

- Description of changes
- Related issue number
- Testing instructions

---

# Reporting Bugs

Please include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Screenshots/logs if applicable
- Environment details

---

# Suggesting Features

Feature requests should include:

- Problem statement
- Proposed solution
- Expected benefits
- Optional mockups or diagrams

---

# Security Vulnerabilities

Please do not create public issues for security vulnerabilities.

Report security issues privately to the repository maintainers.

---

# License

By contributing, you agree that your contributions will be licensed under the project license.
