import { get, post } from './api.js'
import { setUserData, clearUserData } from '../utils.js';

export async function login(email, password) {

    const result = await post('/users/login', { email, password });

    const user = {
        email: result.email,
        id: result._id,
        accessToken: result.accessToken,
    };
    setUserData(user);
}

export async function register(email, password) {
    const result = await post('/users/register', { email, password });

    const user = {
        email: result.email,
        id: result._id,
        accessToken: result.accessToken,
    };
    setUserData(user);
}

export async function logout() {

    await get('/users/logout');
    clearUserData();
}