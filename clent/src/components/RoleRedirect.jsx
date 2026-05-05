import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth/useAuth'
import { getDashboardPath } from '../utils/roleRoutes'

const RoleRedirect = () => {
    const { user } = useAuth()

    return <Navigate to={getDashboardPath(user?.role)} replace />
}

export default RoleRedirect
