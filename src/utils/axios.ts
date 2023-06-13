import {default as instance} from 'axios';

const axios = instance.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60 * 1000,
})

export default axios
