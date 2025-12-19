import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL: 'https://apex-api-8l0q.onrender.com/api',
});

export default instance;