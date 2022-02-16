import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function Router({children}) {
    return (
        <>
            <BrowserRouter>
            {children}
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router