import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [message,  setMessage] = useState('')

    
    const handleSubmit = async () => {
        try{
            const response = await fetch('http://localhost:3000/auth/register', {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    password
                })
            })
            const data = await response.json();
            setMessage(data.message)
        }catch(err){
            setMessage(err)
        }
    }
    return(
        <>
        <Link to='/'><button>BACK</button></Link>
            <form className="form-group" onSubmit={handleSubmit}>
                <h1>Create an Account</h1>
                <div className="name-fields">
                    <div className="name-form">
                        <label>First name:</label>
                        <input type="text" required 
                            value={firstname}
                            onChange={(e)=>setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="name-form">
                        <label>Last name:</label>
                        <input type="text" required
                            value={lastname}
                            onChange={(e)=>setLastname(e.target.value)}
                        />
                    </div>
                </div>
                <div className="email-form">
                    <label>Email:</label>
                    <input type="email" required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="password-form">
                    <label>Password:</label>
                    <input type="password" required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
               
                <button type="submit">REGISTER</button>

                <p>Already have an account??<Link to='/auth/login'>SIGN IN</Link></p>
            </form>
        </>
    )
}
export default RegisterPage;