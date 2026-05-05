import { createContext, use, useMemo, useState } from "react";
import { loginApi, registerApi } from "../../services/authService";

export const AuthContext = createContext(null)


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    const login = async (userData) => {
        console.log("login function in the context")
        const res = await loginApi(userData)

    }
    const logout = () => {

    }

    const registerUser = async (userData) => {
        const response = await registerApi(userData)
        console.log(response?.data?.messgae)
    }

    const value = useMemo(() => {
        return { user, login, logout, isAuthenticated, registerUser }
    })

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}