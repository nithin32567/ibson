import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { useAuth } from './contexts/auth/useAuth'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import RoleRedirect from './components/RoleRedirect'
import AdminDashboardLayout from './layouts/admin/AdminDashboardLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManagerDashboardLayout from './layouts/manager/ManagerDashboardLayout'
import ManagerDashboard from './pages/manager/ManagerDashboard'
import StudentDashboardLayout from './layouts/student/StudentDashboardLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import { ADMIN_ROLES, MANAGER_ROLES, STUDENT_ROLES } from './utils/roleRoutes'

const App = () => {
  const { authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center text-slate-700'>
        Loading...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<GuestRoute />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<RoleRedirect />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={ADMIN_ROLES} />}>
          <Route path='/admin' element={<AdminDashboardLayout />}>
            <Route index element={<RoleRedirect />} />
            <Route path='dashboard' element={<AdminDashboard />} />
            
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={MANAGER_ROLES} />}>
          <Route path='/manager' element={<ManagerDashboardLayout />}>
            <Route index element={<RoleRedirect />} />
            <Route path='dashboard' element={<ManagerDashboard />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={STUDENT_ROLES} />}>
          <Route path='/student' element={<StudentDashboardLayout />}>
            <Route index element={<RoleRedirect />} />
            <Route path='dashboard' element={<StudentDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
