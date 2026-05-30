import { dashboard, getInfo, updateClient, newClient, deleteClient } from "../models/home.model.js";

export const displayInDashboard = async (req, res) =>{
    try{
        const {id} = req.session.user

        const data = await dashboard(id)
        return res.json({
            ...data,
            message : 'successfull',
            isLoggedIn : true
        })
    }catch(err){
        return res.json({
            err
        })
    }
}
export const sendClient = (req, res)=>{
    const {id} = req.params
    getInfo(id, (err, result)=>{
        let client = result[0]
        return res.json({
            client
        })
    })
}
export const updateClients = (req, res) => {
    const {client_id, first_name, last_name, email, payment_amount, payment_status} = req.body
    updateClient(client_id, first_name, last_name, email, payment_amount, payment_status, (err, results)=>{
        return res.json({
            message : 'SUCCESSFULLY EDIT'
        })
    })
}
export const AddClient = (req, res) => {
    const {user_id, first_name, last_name, email,payment_status, payment_amount} = req.body
    newClient(user_id, first_name, last_name, email,payment_status, payment_amount, (err, result) =>{
        return res.json({
            message : 'SUCESSFULLY ADDED'
        })
    })
}
export const deleteThisClient = (req, res)=>{
    const {client_id} = req.body
    deleteClient(client_id, (err, result)=>{
        return res.json({
            message : 'SUCESSFULLY DELETED'
        })
    })
}