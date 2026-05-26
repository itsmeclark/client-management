import express from 'express'
import { isUserLoggin } from '../middlewares/home.middleware.js';
import { displayInDashboard } from '../controllers/home.controller.js';

const router = express.Router()

router.get('/dashboard', isUserLoggin, displayInDashboard )

export default router;