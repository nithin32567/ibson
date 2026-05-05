export const ADMIN_ROLES = ['superadmin']
export const MANAGER_ROLES = ['tutor', 'supervisor', 'manager']
export const STUDENT_ROLES = ['student']

export const getDashboardPath = (role) => {
    if (ADMIN_ROLES.includes(role)) return '/admin/dashboard'
    if (MANAGER_ROLES.includes(role)) return '/manager/dashboard'
    if (STUDENT_ROLES.includes(role)) return '/student/dashboard'
    return '/'
}
