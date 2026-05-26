import { Link } from "react-router-dom";
import styles from '../assets/css/landingPage.module.css'

function LandingPage(){
    return(
        <>
            <header>
                <Link to='/auth/login'><button id={styles.loginBtn}>LOGIN</button></Link>
                <Link to='/auth/register'><button id={styles.registerBtn}>REGISTER</button></Link>
            </header>
            <div>
                <p>Built for businesses that value every client.</p>
                <p>Deliver faster responses, stay organized, and create a seamless experience your clients will remember.</p>
                <button>GET STARTED</button>
                <button>ABOUT US</button>
            </div>
        </>
    )
}
export default LandingPage;