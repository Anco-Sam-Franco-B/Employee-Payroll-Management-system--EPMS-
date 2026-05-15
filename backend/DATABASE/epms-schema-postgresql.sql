# PostgreSQL Version of `epms.sql`

-- PostgreSQL Database Schema for EPMS
-- Converted from MySQL/phpMyAdmin SQL Dump

-- =====================================================
-- Drop Existing Tables
-- =====================================================

DROP TABLE IF EXISTS salary CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS admin CASCADE;

-- =====================================================
-- Table: admin
-- =====================================================

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(230) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'Super Admin',
    department VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Active',
    bio TEXT,
    avatar VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Table: department
-- =====================================================

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    dep_code VARCHAR(12) NOT NULL,
    dep_name VARCHAR(254) NOT NULL,
    gross_salary DECIMAL(10,2) NOT NULL,
    total_deduction DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Table: employee
-- =====================================================

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    dep_id INTEGER NOT NULL,
    emp_number VARCHAR(50) NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    telephone VARCHAR(18) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    hered_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active',
    create_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (dep_id)
        REFERENCES department(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- Table: salary
-- =====================================================

CREATE TABLE salary (
    id SERIAL PRIMARY KEY,
    dep_id INTEGER NOT NULL,
    emp_id INTEGER NOT NULL,
    net_salary DECIMAL(10,2) NOT NULL,
    month DATE NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_salary_department
        FOREIGN KEY (dep_id)
        REFERENCES department(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_salary_employee
        FOREIGN KEY (emp_id)
        REFERENCES employee(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX idx_employee_dep_id
ON employee(dep_id);

CREATE INDEX idx_salary_dep_id
ON salary(dep_id);

CREATE INDEX idx_salary_emp_id
ON salary(emp_id);

-- =====================================================
-- Notes
-- =====================================================
-- 1. AUTO_INCREMENT converted to SERIAL.
-- 2. MySQL ENGINE and COLLATE removed because PostgreSQL handles them differently.
-- 3. ON UPDATE CURRENT_TIMESTAMP behavior in PostgreSQL usually requires triggers.
-- 4. Foreign key constraints added explicitly.
-- 5. Schema structure kept identical to the original MySQL version.

-- =====================================================
-- Triggers for ON UPDATE CURRENT_TIMESTAMP
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_update_date_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_employee_modtime
BEFORE UPDATE ON employee
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_department_modtime
BEFORE UPDATE ON department
FOR EACH ROW EXECUTE FUNCTION update_update_date_column();
