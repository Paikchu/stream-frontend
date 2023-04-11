import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import ErrorPage from "./pages/Error";
import SignIn from "./components/SignIn";
import NavBarG from "./components/NavBarG";
import SignUp from "./components/SignUp";
import Library from "./components/Library";
import Order from "./components/Library";

function App() {
    return (
        <div>
            <div className='page'>
                    <BrowserRouter>
                        <NavBarG />
                        <div className='PageBody'>
                        <Routes>
                            <Route path='/' element={<HomeBody />} errorElement={<ErrorPage />} />
                            <Route path='/home' element={<HomeBody />} errorElement={<ErrorPage />} />
                            <Route path='/library' element={<Library/>} errorElement={<ErrorPage/>}/>
                            <Route path = '/sign-up' element={<SignUp name="user"/>} errorElement = {<ErrorPage/>}/>
                            <Route path='/user-sign-in' element={<SignIn name="user" />} errorElement={<ErrorPage />} />
                        </Routes>
                        </div>
                    </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
