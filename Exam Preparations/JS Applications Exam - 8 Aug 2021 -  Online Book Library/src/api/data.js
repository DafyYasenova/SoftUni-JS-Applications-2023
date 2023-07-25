import {get, post, put, del} from './api.js'


export async function getAllItems() {
    return get('/data/books?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/books/' + id);

}
export async function createItem(data) {
    return post('/data/books', data)
}

export async function deleteById(id){
    return del('/data/books/' +id)
}

export async function getMyBook(id){
    return get(`/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`)
}

export async function editById(id, data){
    return put ('/data/books/'+ id, data)
}


export async function likeById(bookId) {
    return post('/data/likes', bookId);
}

export async function getAllLikes(bookId) {

    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)

}

export async function getAllLikePerUser(bookId, userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
