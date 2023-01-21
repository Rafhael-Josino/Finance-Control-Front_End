import axios from "axios";

//const baseURL = process.env.REACT_APP_PROD_ENV ? 'api:8000/' : 'http://localhost:8000/';

// Accessing API behind reverse proxy
//const baseURL = 'http://localhost:3050/api/';
const baseURL = 'http://localhost:8000/';

export default axios.create({
    baseURL,
});