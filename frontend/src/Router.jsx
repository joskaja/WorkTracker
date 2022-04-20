import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PasswordChangeForm from './components/Account/PasswordChangeForm';
import AuthRoute from './components/AuthRoute';
import ClientForm from './components/Clients/ClientForm';
import ClientsList from './components/Clients/ClientsList';
import ProjectForm from './components/Projects/ProjectForm';
import ProjectsList from './components/Projects/ProjectsList';
import Account from './pages/Account';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import Register from './pages/Register';
import Reports from './pages/Reports';
import Sessions from './pages/Sessions';

function Router({ children }) {
    return (
        <>
            <BrowserRouter>
                {children}
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
                    <Route path="/reports" element={<AuthRoute><Reports /></AuthRoute>} />
                    <Route path="/projects" element={<AuthRoute><Projects /></AuthRoute>}>
                        <Route index element={<ProjectsList />} />
                        <Route path="new" element={<ProjectForm />} />
                        <Route path=":projectID" element={<ProjectForm />} />
                    </Route>
                    <Route path="/session/:sessionID" element={<AuthRoute><Sessions /></AuthRoute>} />
                    <Route path="/clients" element={<AuthRoute><Clients /></AuthRoute>} >
                        <Route index element={<ClientsList />} />
                        <Route path="new" element={<ClientForm />} />
                        <Route path=":clientID" element={<ClientForm />} />
                    </Route>
                    <Route path="/account" element={<AuthRoute><Account /></AuthRoute>} >
                        <Route path="password" element={<PasswordChangeForm />} />
                    </Route>
                    {/*  */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router