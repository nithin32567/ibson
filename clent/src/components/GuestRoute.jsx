import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/auth/useAuth'
import { getDashboardPath } from '../utils/roleRoutes'

const GuestRoute = () => {
    const { isAuthenticated, user } = useAuth()

    if (isAuthenticated) {
        return <Navigate to={getDashboardPath(user?.role)} replace />
    }

    return <Outlet />
}

export default GuestRoute
