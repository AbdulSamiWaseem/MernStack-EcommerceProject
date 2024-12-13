import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    const User = useSelector((state) => state.user.currentUser);
    if(!User){
        return <Navigate to='/login' replace/>
    }
    return children


}

export default ProtectedRoute
