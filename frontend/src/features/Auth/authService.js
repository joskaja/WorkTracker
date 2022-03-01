import { apiRequestService } from '../../services/apiRequestService';
const API_URL = '/api/users';

const register = async (user) => {
    let data = await apiRequestService.post(API_URL, user);
    const userData = data.user;
    if (data) {
        localStorage.setItem('user', JSON.stringify(userData));
    }

    return userData;
}

const login = async (user) => {
    let data = await apiRequestService.post(API_URL + '/login', user);
    const userData = data.user;
    if (data) {
        localStorage.setItem('user', JSON.stringify(userData));
    }

    return userData;
}

const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService