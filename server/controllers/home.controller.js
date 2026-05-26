import {totalClients} from '../models/home.model.js'

export const findUserByEmail = (req, res)=>{
    if(req.session.user){
        return res.json({
            user : req.session.user,
            message : 'user login'
        })
    }
}
export const displayTotalClients = (req, res) => {
    const {id} = req.session.user

    totalClients(id, (err, results)=>{
        return res.json({
            result : results[0]
        })
    })
}