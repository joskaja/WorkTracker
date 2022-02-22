import { apiRequestService } from '../../services/apiRequestService';
const REGISTER_URL = '/api/users';
const LOGIN_URL = '/api/users/login';

const register = async (user) => {
    let data = await apiRequestService.post(REGISTER_URL, user);
    const userData = data.user;
    if (data) {
        localStorage.setItem('user', JSON.stringify(userData));
    }

    return userData;
}

const login = async (user) => {
    let data = await apiRequestService.post(LOGIN_URL, user);
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