import { useState, useEffect } from "react"
import NavBar from "../components/navbar.jsx"
import styles from '../assets/css/homePage.module.css'
import { Outlet, useNavigate, Link, useParams, useOutletContext} from "react-router-dom"

export function HomePage(){
    const [message, setMessage] = useState('')
    const [user, setUser] = useState({
        userInfo : {}
    })
    const [userLogin, setuserLogin] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const islogin = async () =>{
            try{
                const response = await fetch('http://localhost:3000/auth/me', {
                    credentials : 'include'
                })
                const data = await response.json()
                if(data.isLoggedIn == false){
                        navigate('/auth/login')
                }
                setuserLogin(data.message)
            }catch(error){
                setuserLogin(error)
            }
        }
        islogin()
    }, [])
    const dashboard = async ()=>{
         try{
            const response = await fetch('http://localhost:3000/home/dashboard', {
                credentials : 'include',
            })
            const data = await response.json()

            setUser(data)
            
        }catch(err){
            setMessage(err.message)
        }
        }
    useEffect(()=>{
        dashboard()
    }, [])

    function confirmation_delete(e){
        const del = confirm('DELETE THIS CLIENT?')
        if (del) deleteClient(e.target.value); dashboard()
    }
    async function deleteClient(id){
        try{
            const response = await fetch('http://localhost:3000/home/dashboard/delete', {
                credentials : 'include',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    client_id : id
                })
            })
        }catch(err){

        }
    }
    function DisplayClient(){
        if(!user.clientLists){
            return null
        }else{
            return (
            <>
                  {user.clientLists.map((clients)=>{
                                    return <tr className={styles.table_row} key={clients.client_id}>
                                            <td className={styles.row_data_name}>{clients.first_name} {clients.last_name}</td>
                                            <td className={styles.row_data_email}>{clients.email}</td>
                                            <td className={clients.payment_status == 'paid' ? styles.row_data_statusPaid : styles.row_data_statusPending}>
                                            <div>
                                                {clients.payment_status}
                                            </div>
                                            </td>
                                            <td className={styles.row_data_amount}>${clients.payment_amount}</td>
                                            <td className={styles.row_data_btn}><Link to={`/home/dashboard/edit/${clients.client_id}`}><button className={styles.editBtn}>EDIT</button></Link><button value={clients.client_id} onClick={confirmation_delete} className={styles.deleteBtn}>DELETE</button></td>
                                    </tr>
                                })
                    }
            </>
        )
        }
    }
    return (
        <>
            <div className={styles.hero}>
                <NavBar/>
                <Outlet context={{fetchDashboard : dashboard, user_id : user.userInfo.id}}/>
                {/* MAIN CONTAINER */}
                <div className={styles.main_container}>

                    {/* STATS CONTAINER */}
                    <div className={styles.stats_container}>

                        <div className={styles.total_clients}>
                            <p>Total Clients</p>
                            <p>{user.totalClients}</p>
                            <p>List of total clients</p>
                        </div>
                        <div className={styles.active_tasks}>
                            <p>Active Tasks</p>
                            <p>{user.activeTasks}</p>
                            <p>All active tasks</p>
                        </div>
                        <div className={styles.total_earnings}>
                            <p>Total Earnings</p>
                            <p>${user.totalEarnings}</p>
                            <p>Total earnings this month</p>
                        </div>
                        <div className={styles.pending_earnings}>
                            <p>Pending Earnings</p>
                            <p>${user.pendingEarnings}</p>
                            <p>Total pending earnings this month</p>
                        </div>
                    </div>

                    {/* CLIENTS CONTAINER */}
                    <div className={styles.clients_container}>
                        <div className={styles.new_clients}>
                            <Link to='/home/dashboard/new'><button>New client</button></Link>
                        </div>
                        <table className={styles.clients_table}>
                            <thead className={styles.table_head}>
                                <tr>
                                    <td className={styles.head_data}>Name</td>
                                    <td className={styles.head_data}>Email</td>
                                    <td className={styles.head_data}>Status</td>
                                    <td className={styles.head_data}>Amount</td>
                                    <td className={styles.head_data}>Edit</td>
                                </tr>
                            </thead>
                            <tbody className={styles.table_body}>
                                <DisplayClient/>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export function EditClient(){
    const {id} = useParams()
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const {fetchDashboard} = useOutletContext()

    useEffect(()=>{
        const islogin = async () =>{
            try{
                const response = await fetch('http://localhost:3000/auth/me', {
                    credentials : 'include'
                })
                const data = await response.json()
                if(data.isLoggedIn == false){
                        navigate('/auth/login')
                }
            }catch(error){
            }
        }
        islogin()
    }, [])

    useEffect(()=>{
        const displayClient = async () => {
            try{
                const response = await fetch(`http://localhost:3000/home/dashboard/edit/${id}`, {
                    credentials : 'include'
                })
                const data = await response.json()
                setFirstName(data.client.first_name)
                setLastName(data.client.last_name)
                setEmail(data.client.email)
                setAmount(data.client.payment_amount)
                setStatus(data.client.payment_status)

            }catch(err){

            }
        }
        displayClient()
    }, [])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:3000/home/dashboard/save', {
                credentials : 'include',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    client_id : id,
                    first_name : firstname,
                    last_name : lastname,
                    email : email,
                    payment_amount : amount,
                    payment_status :status
                })
            })
            const data = await response.json()
            if(data.message == 'SUCCESSFULLY EDIT'){
                await fetchDashboard()
                navigate('/home/dashboard')
            }
        }catch(err){

        }
    }

    return (
        <div className={styles.back_container}>
                    <form className={styles.edit_container} onSubmit={handleSubmit}>
                        <h1>EDIT CLIENT</h1>
                        <input type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} required/>
                        <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} required/>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="paid">PAID</option>
                            <option value="pending">PENDING</option>
                        </select>
                        <button type="submit">SAVE</button>
                        <Link to='/home/dashboard'><button>CANCEL</button></Link>
                    </form>
                </div>
         
    )
}

export function AddClient(){
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('pending')
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const {user_id, fetchDashboard} = useOutletContext()

    useEffect(()=>{
        const islogin = async () =>{
            try{
                const response = await fetch('http://localhost:3000/auth/me', {
                    credentials : 'include'
                })
                const data = await response.json()
                if(data.isLoggedIn == false){
                        navigate('/auth/login')
                }
            }catch(error){
            }
        }
        islogin()
    }, [])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:3000/home/dashboard/new', {
                credentials : 'include',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    user_id,
                    first_name : firstname,
                    last_name : lastname,
                    email : email,
                    payment_amount : amount,
                    payment_status : status
                })
            })
            const data = await response.json()
            await fetchDashboard()
            navigate('/home/dashboard')
        }catch(err){

        }
    }

     return (
        <div className={styles.back_container}>
                    <form className={styles.edit_container} onSubmit={handleSubmit}>
                        <h1>ADD CLIENT</h1>
                        <input type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} required/>
                        <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} required/>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="paid">PAID</option>
                            <option value="pending">PENDING</option>
                        </select>
                        <button type="submit">ADD</button>
                        <Link to='/home/dashboard'><button>CANCEL</button></Link>
                    </form>
                </div>
         
    )
}