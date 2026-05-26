import { dashboard } from "../models/home.model.js";

export const displayInDashboard = async (req, res) =>{
    try{
        const {id} = req.session.user

        const data = await dashboard(id)

        return res.json({
            ...data,
            message : 'successfull'
        })

    }catch(err){
        return res.json({
            err
        })
    }
}