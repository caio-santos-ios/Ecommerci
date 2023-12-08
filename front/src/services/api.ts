import axios from "axios"

export const api = axios.create({
    // baseURL: 'https://api-ecommerce-9hxf.onrender.com',
    baseURL: 'http://localhost:8600'
})