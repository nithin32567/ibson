import { useAuth } from '../../contexts/auth/useAuth'

const AdminDashboard = () => {
    const { user } = useAuth()

    return (
        <section className='rounded-lg bg-white p-6 shadow-sm'>
            <h2 className='text-2xl font-semibold'>Welcome, {user?.name || 'Super Admin'}</h2>
            <p className='mt-2 text-slate-600'>
                This protected area is available only for the superadmin role.
            </p>
        </section>
    )
}

export default AdminDashboard
