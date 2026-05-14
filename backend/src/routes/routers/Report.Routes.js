import express from 'express';
import { 
  generateReportInPDF, 
  generateAndSaveReport, 
  ReportHistory, 
  downloadReport, 
  multiSaveReport 
} from '../../controllers/Report.Controller.js';

const router = express.Router();

router.post('/generate-pdf', generateReportInPDF);
router.post('/save', generateAndSaveReport);
router.get('/history', ReportHistory);
router.get('/download/:id', downloadReport);
router.post('/multi-save', multiSaveReport);

export default router;
