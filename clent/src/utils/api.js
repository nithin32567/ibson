import axios from 'axios'


const baseUrl = import.meta.env.VITE_BASE_URL
console.log(baseUrl)


const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

api.interceptors.response.use(
    (response) => {

        console.log(response, "axios response")
        return response
    },
    async (error) => {
        console.log(error, "axios error object")
        const originalReq = error.config
        console.log(originalReq, "original req instance")

        if (error.response?.status === 401 && !originalReq._retry) {
            originalReq._retry = true


            try {
                console.log("inside the if condition 401 try")
                await api.post("/auth/refresh")
                return api(originalReq)

            } catch (refreshError) {
                const isGuestPage = ["/login", "/register"].includes(window.location.pathname)
                if (!isGuestPage) {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error)

    }
)

export default api
