import db from '../config/db.js'

const totalClients = "SELECT COUNT(client_id) as totalClients FROM clients WHERE user_id = ?"
   
const activeTasks =`SELECT COUNT(task_id) as activeTasks 
                    FROM tasks JOIN clients ON tasks.client_id = clients.client_id
                    WHERE clients.user_id = ? 
                    AND (task_status = 'pending' OR task_status = 'in_progress')`

const totalEarnings = `SELECT COALESCE(SUM(payment_amount), 0) as totalEarnings FROM clients WHERE user_id = ? AND (payment_status = 'paid')`

const pendingEarnings =`SELECT COALESCE(SUM(payment_amount), 0) as pendingEarnings FROM clients WHERE user_id = ? AND (payment_status = 'pending')`

const userInfo = `SELECT * FROM users WHERE id = ?`

const clientLists = `SELECT * FROM clients WHERE user_id = ?`

export const dashboard = (userid)=>{
    return new Promise((resolve, reject)=>{
        const data = {}

        db.query(totalClients,[userid], (err, result)=>{
            if (err) return reject(err)
            data.totalClients = result[0].totalClients
            
            db.query(activeTasks,[userid], (err, result)=>{
                if (err) return reject(err)
                data.activeTasks = result[0].activeTasks
                
                db.query(totalEarnings,[userid], (err, result)=>{
                    if (err) return reject(err)
                    data.totalEarnings = result[0].totalEarnings
                    
                    db.query(pendingEarnings,[userid], (err, result)=>{
                        if (err) return reject(err)
                        data.pendingEarnings = result[0].pendingEarnings
                        
                        db.query(userInfo,[userid], (err, result)=>{
                            if (err) return reject(err)
                            data.userInfo = result[0]
                            
                                db.query(clientLists,[userid], (err, result)=>{
                                    if (err) return reject(err)
                                    data.clientLists = result
                                    resolve(data)
            
                            })

                        })
                    })
                })
            })
        })
    })
}

export const getInfo = (id,callback) => {
    const sql = `SELECT * FROM clients WHERE client_id = ?`
    db.query(sql, [id], callback)
}
export const updateClient = (id, first_name, last_name, email, payment_amount, payment_status, callback) => {
    const sql = `UPDATE clients 
                    SET first_name = ?, 
                    last_name = ?,
                    email = ?,
                    payment_amount = ?,
                    payment_status = ? WHERE client_id = ?`
    db.query(sql, [first_name, last_name, email, payment_amount, payment_status, id], callback)
}
export const newClient = (user_id, first_name, last_name, email, payment_status, payment_amount, callback) => {
    const sql = "INSERT INTO clients(user_id,first_name, last_name, email,payment_status, payment_amount) VALUES (?, ?, ?, ?,?,?)"
    db.query(sql, [user_id, first_name, last_name, email, payment_status, payment_amount ], callback)
}
export const deleteClient = (client_id, callback)=>{
    const sql = "DELETE FROM clients WHERE client_id = ?"
    db.query(sql, [client_id], callback)
}