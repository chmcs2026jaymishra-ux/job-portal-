import axios from "axios";
const api = axios.create({
    baseURL: 'https://backend-atv2.onrender.com'
})
export default api
