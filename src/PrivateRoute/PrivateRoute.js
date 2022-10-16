import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../contexts/UserContext'

const PrivateRoute = ({children}) => {
    const {user, isLoading} = useContext(authContext);


    if(isLoading){
        return <p className='text-center text-3xl font-bold'>Loading...</p>
    }
    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' />;
}

export default PrivateRoute