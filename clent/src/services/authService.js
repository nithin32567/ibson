
import api from "../utils/api";


export const registerApi = async (data) => {
    try {
        const response = await api.post("/auth/register", data)
        return response.data

    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Register user failed" }
    }
}


export const loginApi = async (data) => {
    try {
        const response = await api.post("/auth/login", data)
        return response.data

    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Login failed" }
    }
}
