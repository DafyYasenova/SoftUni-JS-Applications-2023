import { get, post, put, del } from './api.js'


export async function getAllItems() {
    return get('/data/albums?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/albums/' + id);
    //  /data/albums/:id


}
export async function createItem(data) {
    return post('/data/albums', data)
}

export async function deleteById(id) {
    return del('/data/albums/' + id)
}

export async function editById(id, data) {
    return put('/data/albums/' + id, data);
}

export async function likeById(data) {
    return post('/data/likes', data);
}

export async function getAllLikes(albumId) {

    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)

}

export async function getAllLikePerUser(albumId, userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);


}