import { useEffect, useMemo, useState } from "react";
import { loginApi, registerApi } from "../../services/authService";
import api from "../../utils/api";
import { AuthContext } from "./authContext";


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)


    const checkAuth = async () => {
        try {
            const response = await api.get("/auth/getme")
            const { data } = response.data
            setUser(data)
            setIsAuthenticated(Boolean(data))
        } catch (error) {
            setUser(null)
            setIsAuthenticated(false)
            console.log(error)
        } finally {
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkAuth()
    }, [])


    const login = async (userData) => {
        const res = await loginApi(userData)
        if (res?.success) {
            const loggedInUser = res.user || res.data
            setUser(loggedInUser)
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
        return { user, login, logout, isAuthenticated, authLoading, registerUser }
    }, [user, isAuthenticated, authLoading])

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
