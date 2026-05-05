import { useAuth } from '../contexts/auth/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { getDashboardPath } from '../utils/roleRoutes'

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth()
    const userRole = user?.role

    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace />
    }

    if (allowedRoles?.length && !allowedRoles.includes(userRole)) {
        return <Navigate to={getDashboardPath(userRole)} replace />
    }

    return <Outlet />
}

export default ProtectedRoute
