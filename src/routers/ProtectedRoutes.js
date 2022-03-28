import React, { useContext } from 'react'
import { Navigate} from 'react-router-dom'
import { context } from '../context/authContext'

export const ProtectedRoutes = ({children}) => {
    const authContext = useContext(context);

    return (authContext.logged)
    ? children
    : <Navigate to='/login' />
}
