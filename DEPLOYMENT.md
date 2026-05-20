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
