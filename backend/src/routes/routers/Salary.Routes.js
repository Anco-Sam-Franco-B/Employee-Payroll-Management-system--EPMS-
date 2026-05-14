import express from 'express';
import { viewSalaries, processPayroll } from '../../controllers/Salary.Controller.js';

const router = express.Router();

router.get('/', viewSalaries);
router.post('/process', processPayroll);

export default router;
