import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/auth/useAuth'

const AdminDashboardLayout = () => {
    const { user, logout } = useAuth()

    return (
        <div className='min-h-screen bg-slate-100 text-slate-900'>
            <div className='flex min-h-screen'>
                <aside className='w-64 shrink-0 bg-slate-950 px-5 py-6 text-white'>
                    <h2 className='text-xl font-semibold'>Super Admin Panel</h2>
                    <p className='mt-1 text-sm capitalize text-slate-300'>{user?.role}</p>

                    <nav className='mt-8 flex flex-col gap-2 text-sm'>
                        <Link className='rounded-md px-3 py-2 hover:bg-slate-800' to='/admin/dashboard'>Dashboard</Link>
                        <Link className='rounded-md px-3 py-2 hover:bg-slate-800' to='/'>Home</Link>
                    </nav>
                </aside>

                <div className='flex min-h-screen flex-1 flex-col'>
                    <header className='flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
                        <div>
                            <h1 className='text-lg font-semibold'>Super Admin Dashboard</h1>
                            <p className='text-sm text-slate-500'>{user?.name || user?.email}</p>
                        </div>
                        <button onClick={logout} className='rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white'>
                            Logout
                        </button>
                    </header>

                    <main className='flex-1 p-6'>
                        <Outlet />
                    </main>

                    <footer className='border-t border-slate-200 bg-white px-6 py-4 text-sm text-slate-500'>
                        Super admin workspace
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardLayout
