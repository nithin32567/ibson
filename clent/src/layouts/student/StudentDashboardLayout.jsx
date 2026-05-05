import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/auth/useAuth'

const StudentDashboardLayout = () => {
    const { user, logout } = useAuth()

    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900'>
            <header className='flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4'>
                <div>
                    <h1 className='text-lg font-semibold'>Student Dashboard</h1>
                    <p className='text-sm text-zinc-500'>{user?.name || user?.email}</p>
                </div>
                <nav className='flex items-center gap-3 text-sm'>
                    <Link className='rounded-md px-3 py-2 hover:bg-zinc-100' to='/student/dashboard'>Dashboard</Link>
                    <Link className='rounded-md px-3 py-2 hover:bg-zinc-100' to='/'>Home</Link>
                    <button onClick={logout} className='rounded-md bg-zinc-900 px-4 py-2 font-medium text-white'>
                        Logout
                    </button>
                </nav>
            </header>

            <main className='mx-auto w-full max-w-6xl px-6 py-8'>
                <Outlet />
            </main>

            <footer className='border-t border-zinc-200 bg-white px-6 py-4 text-sm text-zinc-500'>
                Student workspace
            </footer>
        </div>
    )
}

export default StudentDashboardLayout
