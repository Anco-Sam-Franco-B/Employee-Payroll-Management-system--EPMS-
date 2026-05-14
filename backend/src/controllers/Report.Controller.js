import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import { Parser } from "json2csv";
import fs from "fs";
import path from "path";
import db from "../config/Database.js";

export const generateReportInPDF = async (req, res) => {
  const { department, status, fromDate, toDate } = req.body;

  try {
    let sql = "SELECT employee.*, department.dep_name FROM employee JOIN department ON department.id=employee.dep_id WHERE 1=1";
    const params = [];

    if (department !== "All") {
      sql += " AND department.dep_name = ?";
      params.push(department);
    }
    if (status !== "All") {
      sql += " AND employee.status = ?";
      params.push(status);
    }

    db.query(sql, params, (err, data) => {
      if (err) return res.status(500).json({ message: "Database error", error: err.message });

      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=epms-report.pdf");
      doc.pipe(res);

      doc.fontSize(20).text("EPMS REPORT", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Department: ${department}`);
      doc.text(`Status: ${status}`);
      doc.moveDown();

      data.forEach((emp, index) => {
        doc.text(`${index + 1}. ${emp.fname} ${emp.lname} | ${emp.dep_name} | ${emp.position} | ${emp.status}`);
      });

      doc.end();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const generateAndSaveReport = async (req, res) => {
  const { title, type, department, employee, status, fromDate, toDate } = req.body;

  const fileName = `report-${Date.now()}.pdf`;
  const filePath = path.join("reports", fileName);

  if (!fs.existsSync("reports")) {
    fs.mkdirSync("reports");
  }

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(20).text("EPMS REPORT", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Title: ${title}`);
  doc.text(`Type: ${type}`);
  doc.text(`Department: ${department}`);
  doc.text(`Status: ${status}`);
  doc.end();

  const sql = `INSERT INTO reports (title, type, department, employee, status, from_date, to_date, file_name, file_path, generated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [title, type, department, employee, status, fromDate, toDate, fileName, filePath, "admin"], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Report generated and saved", reportId: result.insertId });
  });
};

export const ReportHistory = async (req, res) => {
  db.query("SELECT * FROM reports ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const downloadReport = async (req, res) => {
  db.query("SELECT * FROM reports WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: "Report not found" });
    const report = results[0];
    const filePath = path.resolve(report.file_path);
    res.download(filePath, report.file_name);
  });
};

export const multiSaveReport = async (req, res) => {
  try {
    const { title, type, format } = req.body;
    const fileName = `report-${Date.now()}.${format}`;
    const dir = "reports";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const filePath = path.join(dir, fileName);

    db.query("SELECT employee.*, department.dep_name FROM employee JOIN department ON department.id=employee.dep_id", async (err, data) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (format === "pdf") {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(filePath));
        doc.fontSize(20).text(title || "EPMS Report");
        doc.moveDown();
        data.forEach((e) => doc.text(`${e.fname} ${e.lname} | ${e.dep_name} | ${e.position}`));
        doc.end();
      } else if (format === "excel") {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Report");
        sheet.columns = [
          { header: "First Name", key: "fname" },
          { header: "Last Name", key: "lname" },
          { header: "Department", key: "dep_name" },
          { header: "Position", key: "position" },
        ];
        sheet.addRows(data);
        await workbook.xlsx.writeFile(filePath);
      } else if (format === "csv") {
        const parser = new Parser();
        const csv = parser.parse(data);
        fs.writeFileSync(filePath, csv);
      }

      db.query("INSERT INTO reports (title, type, format, file_name, file_path) VALUES (?, ?, ?, ?, ?)", [title, type, format, fileName, filePath]);
      res.json({ success: true, message: "Report generated successfully", downloadUrl: `/api/reports/download/${fileName}` });
    });
  } catch (error) {
    res.status(500).json({ error: "Report generation failed" });
  }
};