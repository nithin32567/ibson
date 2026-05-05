import { createContext, useMemo, useState } from "react";
import { loginApi, registerApi } from "../../services/authService";

export const AuthContext = createContext(null)


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    const login = async (userData) => {
        const res = await loginApi(userData)
        if (res?.success) {
            localStorage.setItem("accessToken", res.accessToken)
            setUser(res.user)
            setIsAuthenticated(true)
        }

        return res

    }
    const logout = () => {
        localStorage.removeItem("accessToken")
        setUser(null)
        setIsAuthenticated(false)

    }

    const registerUser = async (userData) => {
        const response = await registerApi(userData)
        return response
    }

    const value = useMemo(() => {
        return { user, login, logout, isAuthenticated, registerUser }
    }, [user, isAuthenticated])

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
