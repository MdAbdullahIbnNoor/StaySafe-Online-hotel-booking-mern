import React from 'react'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { Navigate } from 'react-router-dom'

const AdminRoutes = ({ children }) => {
    const [role, isLoading] = useRole()

    if(isLoading) return <LoadingSpinner/>
    if(role === 'admin') return children
    return (
        <Navigate to='/dashboard' />
    )
}

export default AdminRoutes