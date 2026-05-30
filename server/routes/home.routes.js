import express from 'express'
import { isUserLoggin } from '../middlewares/home.middleware.js';
import { displayInDashboard, sendClient, updateClients, AddClient, deleteThisClient } from '../controllers/home.controller.js';

const router = express.Router()

router.get('/dashboard', isUserLoggin, displayInDashboard )
router.get('/dashboard/edit/:id', sendClient )
router.post('/dashboard/save', updateClients)
router.post('/dashboard/new', AddClient)
router.post('/dashboard/delete', deleteThisClient)

export default router;