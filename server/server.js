import express, { urlencoded } from 'express'
import session from 'express-session'
import db from './config/db.js'
import AuthRoutes from './routes/auth.routes.js'
import HomeRoutes from './routes/home.routes.js'
import cors from 'cors'
import { configDotenv } from 'dotenv'

configDotenv()

const app = express()

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(session({
    secret : process.env.SECRET_KEY,
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true
    }
}))

app.use('/auth', AuthRoutes)
app.use('/home', HomeRoutes)

app.listen(3000, ()=>{
    console.log('http://localhost:3000/')
})