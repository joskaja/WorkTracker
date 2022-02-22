import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Register from './pages/Register';
import Reports from './pages/Reports';

function Router({ children }) {
    return (
        <>
            <BrowserRouter>
                {children}
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/clients" element={<Clients />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router