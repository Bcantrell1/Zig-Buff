import axios from 'axios';
import jwtDecode from 'jwt-decode';

const httpClient = axios.create();

httpClient.getToken = () => {
    return localStorage.getItem('steamToken');
}

httpClient.setToken = (token) => {
    localStorage.setItem('steamToken', token);
    return token;
}

httpClient.logOut = () => {
    localStorage.removeItem('steamToken');
    return null;
}

httpClient.getUser = () => {
    const token = httpClient.getToken();
    if (token) {
        const data = jwtDecode(token);
        return data;
    };
    return null;
}

export default httpClient;