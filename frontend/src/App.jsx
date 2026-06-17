import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/landingPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import {HomePage, EditClient, AddClient} from './pages/homePage.jsx';
import {TasksPage} from './pages/taskPage.jsx'

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/auth/login' element={<LoginPage/>}/>
                <Route path='/auth/register' element={<RegisterPage/>}/>
                <Route path='/home/dashboard' element={<HomePage key={Date.now()}/>}>
                    <Route path='edit/:id' element={<EditClient/>}></Route>
                    <Route path='new' element={<AddClient/>}></Route>
                </Route>
                <Route path='/home/tasks' element={<TasksPage/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;