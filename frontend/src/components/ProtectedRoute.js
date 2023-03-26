import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ children }) => {
    const loggedIn = localStorage.getItem('token')?.length > 0
    return loggedIn
            ? <>{children}</>
            : <Navigate to="/signin" replace />
}

export default ProtectedRouteElement;