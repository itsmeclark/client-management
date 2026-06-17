import {getAllTasks} from '../models/tasks.model.js';

export const getTasks = (req, res) => {
    const {user_id} = req.body
    getAllTasks(user_id, (err, result)=>{
        return res.json({
            tasks : result[0]
        })
    })
}
