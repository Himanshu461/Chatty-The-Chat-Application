import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chatty-the-chat-application.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
