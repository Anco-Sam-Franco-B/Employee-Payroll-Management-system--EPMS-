# CONTRIBUTING.md

```md
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
```

---

# CODE_OF_CONDUCT.md

```md
# Code of Conduct

## Our Pledge

We are committed to creating a welcoming, respectful, and inclusive environment for everyone participating in this project.

Participants are expected to:

- Be respectful and professional
- Accept constructive feedback
- Collaborate openly
- Support other contributors
- Focus on improving the project

---

# Unacceptable Behavior

Examples of unacceptable behavior include:

- Harassment or discrimination
- Offensive comments
- Personal attacks
- Trolling or insulting behavior
- Publishing private information
- Any unethical or illegal activities

---

# Enforcement Responsibilities

Project maintainers are responsible for:

- Clarifying standards
- Reviewing reports
- Taking appropriate action
- Maintaining a safe environment

---

# Reporting Issues

If you experience or witness unacceptable behavior, report it to the maintainers privately.

All reports will be handled confidentially.

---

# Enforcement Actions

Maintainers may:

- Issue warnings
- Remove inappropriate content
- Restrict participation
- Permanently ban users from the project

---

# Scope

This Code of Conduct applies to:

- GitHub discussions
- Pull requests
- Issues
- Project documentation
- Community spaces related to the project

---

# Attribution

This Code of Conduct is inspired by the Contributor Covenant.
```

---

# DEPLOYMENT.md

```md
# Deployment Guide for EPMS

This guide explains how to deploy the Employee Payroll Management System (EPMS).

---

# Technology Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL/MySQL
- Reverse Proxy: Nginx
- Process Manager: PM2

---

# Prerequisites

Install:

- Node.js
- npm
- PostgreSQL or MySQL
- Git
- PM2
- Nginx

---

# Clone Repository

```bash
git clone https://github.com/Anco-Sam-Franco-B/Employee-Payroll-Management-system--EPMS-.git
```

---

# Backend Deployment

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create `.env`:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
NODE_ENV=production
```

## Run database migrations

```bash
npm run migrate
```

## Start backend with PM2

```bash
pm2 start server.js --name epms-backend
```

---

# Frontend Deployment

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Build frontend

```bash
npm run build
```

---

# Nginx Configuration

Example:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /var/www/epms/frontend/dist;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

# Enable HTTPS with Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

# PM2 Commands

## Restart application

```bash
pm2 restart epms-backend
```

## View logs

```bash
pm2 logs
```

## Save PM2 process list

```bash
pm2 save
```

---

# Docker Deployment

## Example Dockerfile

```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

---

# CI/CD Recommendations

Recommended:

- GitHub Actions
- Docker
- Railway
- Render
- VPS with Nginx

---

# Production Security Checklist

- Enable HTTPS
- Use secure environment variables
- Enable rate limiting
- Use HTTP-only cookies
- Enable CORS restrictions
- Backup database regularly
- Monitor logs and errors
```

---

# CHANGELOG.md

```md
# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog.

---

## [1.0.0] - 2026-05-20

### Added

- Employee management module
- Department management module
- Payroll management system
- Authentication and authorization
- Admin dashboard
- Report generation system
- Attendance management
- Responsive UI with Tailwind CSS

### Security

- JWT authentication
- Password hashing
- Protected API routes

### Documentation

- Added CONTRIBUTING.md
- Added CODE_OF_CONDUCT.md
- Added DEPLOYMENT.md
- Added GitHub issue templates
- Added CHANGELOG.md
```

---

# .github/ISSUE_TEMPLATE/bug_report.md

```md
---
name: Bug Report
about: Create a report to help improve the project
title: "[BUG] "
labels: bug
assignees: ''
---

# Bug Description

Describe the issue clearly.

---

# Steps To Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

---

# Expected Behavior

Describe what you expected to happen.

---

# Screenshots

Add screenshots if applicable.

---

# Environment

- OS:
- Browser:
- Node.js Version:
- Database:

---

# Additional Context

Add any other context about the problem.
```

---

# .github/ISSUE_TEMPLATE/feature_request.md

```md
---
name: Feature Request
about: Suggest a new feature for the project
title: "[FEATURE] "
labels: enhancement
assignees: ''
---

# Feature Summary

Describe the feature.

---

# Problem Statement

What problem does this feature solve?

---

# Proposed Solution

Describe your proposed solution.

---

# Alternatives Considered

Describe alternatives you considered.

---

# Additional Context

Add screenshots, diagrams, or references if applicable.
```

---

# .github/ISSUE_TEMPLATE/config.yml

```yml
blank_issues_enabled: false
contact_links:
  - name: Security Reports
    url: https://github.com/Anco-Sam-Franco-B
    about: Please report security vulnerabilities privately.
```

