import axios from "axios";
import { ENV } from './dotenv'

const axiosIn = axios.create({
    baseURL: ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosIn;