import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/landingPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import HomePage from './pages/homePage.jsx';

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/auth/login' element={<LoginPage/>}/>
                <Route path='/auth/register' element={<RegisterPage/>}/>
                <Route path='/home/dashboard' element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App;