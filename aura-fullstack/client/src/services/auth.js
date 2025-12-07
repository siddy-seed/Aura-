import API from './api';

const signup = async (userData) => {
    const response = await API.post('/auth/signup', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const login = async (userData) => {
    const response = await API.post('/auth/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser
};

export default authService;
