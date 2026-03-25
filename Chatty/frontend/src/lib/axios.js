import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: "https://chatty-the-chat-application.onrender.com", 
    withCredentials: true,
})
