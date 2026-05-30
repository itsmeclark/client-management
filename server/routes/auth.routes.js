import express from 'express'
import { addAcount, findUser, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/register', addAcount)
router.post('/login', findUser)
router.get('/logout', logoutUser)
router.get('/me', (req, res)=>{
    if(req.session.user){
        return res.json({
            message : 'USER LOGIN',
            isLoggedIn : true

        })
    }
     return res.json({
            message : 'USER LOGOUT',
            isLoggedIn : false
        })
})
export default router;