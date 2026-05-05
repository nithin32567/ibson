import { useAuth } from '../../contexts/auth/useAuth'

const StudentDashboard = () => {
    const { user } = useAuth()

    return (
        <section className='rounded-lg bg-white p-6 shadow-sm'>
            <h2 className='text-2xl font-semibold'>Welcome, {user?.name || 'Student'}</h2>
            <p className='mt-2 text-zinc-600'>This protected area is available only for student users.</p>
        </section>
    )
}

export default StudentDashboard
