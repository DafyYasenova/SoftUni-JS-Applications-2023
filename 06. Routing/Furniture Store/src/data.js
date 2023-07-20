import * as api from './api.js';
//import { editPage } from './views.js/edit';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    furniture: '/data/catalog',
    byId: '/data/catalog/',
    myFurniture: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/',
};

export async function getItems() {
    return api.get(endpoints.furniture);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getMyItems(userId) {
    return api.get(endpoints.myFurniture(userId));
}

// модулите нямат публичен скоуп и ако искаме да ги тестваме трябва да ги закачим на уиндола
// window.api = {
//     getFurniture,
//     getById,
//     getFurniture
// }

export async function createItem(data) {
    return api.post(endpoints.create, data);
}

export async function editItem(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteItem(id) {
    return api.del(endpoints.delete + id);
}
