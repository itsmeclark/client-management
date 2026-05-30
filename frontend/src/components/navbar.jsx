import {Link, useNavigate} from 'react-router-dom'
import styles from '../assets/css/navbar.module.css';
import { useEffect, useState } from 'react';

function NavBar(){
    const navigate = useNavigate()
    const [message, setMessage] = useState()

    const confirmationLogout = () =>{
        let wantLogout = confirm('YOU WANT TO LOGUT? ')
        if(wantLogout){
            handleLogout()
        }else{
            return
        }
    }
    const handleLogout = async() =>{
        try{
            const response = await fetch('http://localhost:3000/auth/logout', {
                credentials : 'include'
            })
            const data =  await response.json()
            if(data.isLoggedIn == false){
                    navigate('/')
            }
        }catch(err){
            setMessage(err)
        }
   }

    return (
        <>
            <nav className={styles.navBar}>
                <Link to='/home/dashboard' id={styles.dashboard}><span >Dashboard</span></Link>
                <Link to='/home/tasks' id={styles.tasks}><span>Tasks</span></Link>
                <button onClick={confirmationLogout}>LOGOUT</button>
            </nav>
        </>
    )
}
export default NavBar;