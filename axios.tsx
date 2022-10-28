import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://testproject-b6bfb-default-rtdb.firebaseio.com/'
});

export default instance;