import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-e4359.cloudfunctions.net/api'
    // https://us-central1-clone-e4359.cloudfunctions.net/api
    // http://localhost:5001/clone-e4359/us-central1/api
});

export default instance;