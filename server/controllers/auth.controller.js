import { findEmail, addUser } from "../models/auth.model.js";
import bcrypt from 'bcrypt'

export const findUser = (req, res) => {
    const {email, password} = req.body

    findEmail(email, async (err, result)=>{
        if (err) {
            return res.json({
                message: err.message
            });
        }
        if(result.length === 0){
            return res.json({
                message : 'EMAIL OR PASSWORD IS INCORRECT!'
            })
        }
        try{
            const user = result[0]
            const hashPass = await bcrypt.compare(password, user.password)
            const {password:_, ...userNoPass} = user
            if(hashPass){
                req.session.user = userNoPass
                req.session.save(()=>{
                     return res.json({
                    message : 'SUCCESSFULLY LOGIN!',
                    user : userNoPass,
                    isLoggedIn : true
                })
                })
               
            }else{
                return res.json({
                    message : 'EMAIL OR PASSWORD IS INCORRECT!'
            })
            }

        }catch(err){
            return res.json({
                message : err.message
            })
        }
    })
}
export const addAcount = async (req, res)=>{
    const {firstname, lastname, email, password} = req.body
    try{
        const hashedPass = await bcrypt.hash(password, 10)
        addUser(firstname, lastname, email, hashedPass, (err, result)=>{
            return res.json({
                message : 'ACCOUNT CREATED!'
            })
        })
    }catch(err){
        return res.json({
            message : err
        })
    }
    
}
export const logoutUser = (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.json({
                message: err.message
            });
        }
        res.clearCookie('connect.sid')
        return res.json({
            message: "LOGOUT SUCCESSFUL!",
            isLoggedIn : false
        })
    })
}

