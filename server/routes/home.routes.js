import express from 'express'
import { isUserLoggin } from '../middlewares/home.middleware.js';
import { findUserByEmail } from '../controllers/home.controller.js';

const router = express.Router()

router.get('/dashboard', isUserLoggin, findUserByEmail)

export default router;