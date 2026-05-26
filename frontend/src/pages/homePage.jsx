import { useState, useEffect } from "react"
import NavBar from "../components/navbar.jsx"
import styles from '../assets/css/homePage.module.css'

function HomePage(){
    const [message, setMessage] = useState('')
    const [user, setUser] = useState({})

    useEffect(()=>{
        const isLoggedUserin = async ()=>{
         try{
            const response = await fetch('http://localhost:3000/home/dashboard', {
                credentials : 'include',
            })
            const data = await response.json()
            setUser(data.user)
            setMessage(data.message)
            
        }catch(err){
            setMessage(err.message)
        }
        }
        isLoggedUserin()
    }, [])

    return (
        <>
            <div className={styles.hero}>
                <NavBar/>
                <div className={styles.main_container}>
                    <div className={styles.stats_container}>
                        <div className={styles.total_clients}>
                            <p>Total Clients</p>
                            <p>15</p>
                        </div>
                        <div className={styles.active_tasks}>
                            <p>Active Tasks</p>
                            <p>25</p>
                        </div>
                        <div className={styles.total_earnings}>
                            <p>Total Earnings</p>
                            <p>P. 800</p>
                        </div>
                        <div className={styles.pending_earnings}>
                            <p>Pending Earnings</p>
                            <p>P. 920</p>
                        </div>
                    </div>
                    <div className={styles.clients_container}>

                    </div>
                </div>
               
            </div>
        </>
    )
}
export default HomePage;