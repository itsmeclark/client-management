import db from '../config/db.js'

export const totalClients = (id, callback) =>{
    const sql = "SELECT COUNT(client_id) FROM clients WHERE usert_id = ?"
    db.query(sql, [id], callback)
}
export const activeTasks = (callback) =>{
    const sql = `SELECT COUNT(task_id) FROM tasks WHERE task_status = 'pending' OR task_status = 'in_progress'`
    db.query(sql, callback)
}
export const totalEarnings = (callback) =>{
    const sql = `SELECT SUM(payment_amount) FROM clients WHERE payment_status = 'paid'`
    db.query(sql, callback)
}
export const pendingEarnings = (callback) =>{
    const sql = `SELECT SUM(payment_amount) FROM clients WHERE payment_status = 'pending'`
    db.query(sql, callback)
}

