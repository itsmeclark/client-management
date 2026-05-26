import express from 'express'
import { addAcount, findUser, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/register', addAcount)
router.post('/login', findUser)
router.post('/logout', logoutUser)

export default router;