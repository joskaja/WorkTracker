import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
    const auth = useSelector(state => state.auth);
    return auth.user ? children : <Navigate to="/login" replace />
}

export default AuthRoute