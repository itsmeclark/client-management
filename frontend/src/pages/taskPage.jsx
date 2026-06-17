import NavBar from '../components/navbar.jsx'
import styles from '../assets/css/homePage.module.css'
import { Link } from 'react-router-dom'

export function TasksPage(){
   return (
        <>
            <div className={styles.hero}>
                <NavBar/>
                {/* MAIN CONTAINER */}
                <div className={styles.main_container}>

                    {/* TASKS CONTAINER */}
                    <div className={styles.clients_container}>
                        <div className={styles.new_clients}>
                            <Link to='/home/dashboard/new'><button>New Tasks</button></Link>
                        </div>
                        <table className={styles.clients_table}>
                            <thead className={styles.table_head}>
                                <tr>
                                    <td className={styles.head_data}>Name</td>
                                    <td className={styles.head_data}>Email</td>
                                    <td className={styles.head_data}>Status</td>
                                    <td className={styles.head_data}>Edit</td>
                                </tr>
                            </thead>
                            <tbody className={styles.table_body}>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}