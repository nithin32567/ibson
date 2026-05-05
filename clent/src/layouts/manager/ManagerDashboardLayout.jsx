import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/auth/useAuth'

const ManagerDashboardLayout = () => {
    const { user, logout } = useAuth()

    return (
        <div className='min-h-screen bg-stone-50 text-stone-950'>
            <div className='flex min-h-screen'>
                <aside className='w-64 shrink-0 border-r border-stone-200 bg-white px-5 py-6'>
                    <h2 className='text-xl font-semibold'>Manager Panel</h2>
                    <p className='mt-1 text-sm capitalize text-stone-500'>{user?.role}</p>

                    <nav className='mt-8 flex flex-col gap-2 text-sm'>
                        <Link className='rounded-md px-3 py-2 hover:bg-stone-100' to='/manager/dashboard'>Dashboard</Link>
                        <Link className='rounded-md px-3 py-2 hover:bg-stone-100' to='/'>Home</Link>
                    </nav>
                </aside>

                <div className='flex min-h-screen flex-1 flex-col'>
                    <header className='flex items-center justify-between border-b border-stone-200 bg-white px-6 py-4'>
                        <div>
                            <h1 className='text-lg font-semibold'>Manager Dashboard</h1>
                            <p className='text-sm text-stone-500'>{user?.name || user?.email}</p>
                        </div>
                        <button onClick={logout} className='rounded-md bg-stone-950 px-4 py-2 text-sm font-medium text-white'>
                            Logout
                        </button>
                    </header>

                    <main className='flex-1 p-6'>
                        <Outlet />
                    </main>

                    <footer className='border-t border-stone-200 bg-white px-6 py-4 text-sm text-stone-500'>
                        Manager workspace
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default ManagerDashboardLayout
