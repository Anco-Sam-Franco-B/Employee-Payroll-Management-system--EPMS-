import express from 'express';
import { getStats } from '../../controllers/Dashboard.Controller.js';

const router = express.Router();

router.get('/stats', getStats);

export default router;
