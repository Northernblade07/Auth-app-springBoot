import axios from 'axios'
const BASE_URL ="http://localhost:8082/api/v1"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_USL || BASE_URL,
    headers:{
        'Content-Type': "application/json",
    },
    withCredentials:true,
    timeout:10000,
});

export default apiClient