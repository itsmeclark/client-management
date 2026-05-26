import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const isLoggedUserin = async ()=>{
         try{
            const response = await fetch('http://localhost:3000/auth/me', {
                credentials : 'include',
            })
            const data = await response.json()
            if(data.isLoggedIn === true){
                navigate('/home/dashboard')
            }
            setMessage(data.message)
            
        }catch(error){
            setMessage(error)
        }
        }

        isLoggedUserin()
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:3000/auth/login', {
                method : "POST",
                credentials : 'include',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json()
            if(data.isLoggedIn === true){
                navigate('/home/dashboard')
            }
            setMessage(data.message)
            
        }catch(err){
            setMessage(err.message)
        }
    }
    return(
        <>
        <Link to='/'><button>BACK</button></Link>
            <form className="form-group" onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <h1>{message}</h1>
                <div className="email-form">
                    <label>Email:</label>
                    <input type="email" required
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div className="password-form">
                    <label>Password:</label>
                    <input type="password" required
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
               
                <button type="submit">LOGIN</button>

                <p>Don't have an Account?<Link to='/auth/register'>SIGNUP</Link></p>
            </form>
        </>
    )
}
export default LoginPage;