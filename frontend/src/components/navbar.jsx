import {Link} from 'react-router-dom'
import styles from '../assets/css/navbar.module.css';

function NavBar(){
    return (
        <>
            <nav className={styles.navBar}>
                <Link to='/home/dashboard' id={styles.dashboard}><span >Dashboard</span></Link>
                <Link to='/home/tasks' id={styles.tasks}><span>Tasks</span></Link>
            </nav>
        </>
    )
}
export default NavBar;