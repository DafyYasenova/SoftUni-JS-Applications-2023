import { getUserData, clearUserData } from "../utils.js";


const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options);

        let result = '';

        if (response.status != 204) {
            result = await response.json();
        }

        if (response.ok !== true) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = result;
            throw error;
        }
        return result;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}
const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {
    get, post, put, del
}