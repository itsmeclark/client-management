import db from "../config/db.js"

export const findEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?"
    db.query(sql, [email], callback)
}
export const addUser = (first_name,last_name,email,password, callback) => {
    const sql = "INSERT INTO users(first_name, last_name, email, password) VALUES (?, ?, ?, ?)"
    db.query(sql, [first_name,last_name,email,password], callback)
}