import axios from 'axios'


const baseUrl = import.meta.env.VITE_BASE_URL
console.log(baseUrl)


const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})



api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
)

export default api