
import api from "../utils/api";


export const registerApi = async (data) => {
    console.log(data, "inn the service function")
    try {
        const response = await api.post("/auth/register", data)
        console.log(response, "respnse in the auth service")
        return response.data

    } catch (error) {
        console.log(error)
        return (error || "register user failed")
    }
}


export const loginApi = async (data) => {
    console.log(data, "inn the service function")
    try {
        const response = await api.post("/auth/login", data)
        console.log(response, "respnse in the auth service")
        return response.data

    } catch (error) {
        console.log(error)
        return (error || "register user failed")
    }
}