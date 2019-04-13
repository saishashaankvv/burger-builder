import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-c15fc.firebaseio.com/'
});

export default instance;