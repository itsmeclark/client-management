import db from "../config/db.js"
export const getAllTasks = (user_id, callback) =>{
    const sql = "SELECT * FROM tasks JOIN clients ON tasks.client_id = clients.id = ?"
    db.query(sql, [user_id], callback)
}