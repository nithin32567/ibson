import { useAuth } from '../../contexts/auth/useAuth'

const ManagerDashboard = () => {
    const { user } = useAuth()

    return (
        <section className='rounded-lg bg-white p-6 shadow-sm'>
            <h2 className='text-2xl font-semibold'>Welcome, {user?.name || 'Manager'}</h2>
            <p className='mt-2 text-stone-600'>
                This protected area is available for tutor, supervisor, and manager roles.
            </p>
        </section>
    )
}

export default ManagerDashboard
