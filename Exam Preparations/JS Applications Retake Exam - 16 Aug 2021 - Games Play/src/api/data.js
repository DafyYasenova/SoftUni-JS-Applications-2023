import {get, post, put, del} from './api.js'


export async function getAllItems() {
    return get('/data/games?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/games/' + id);

}
export async function createItem(data) {
    return post('/data/games', data)
}

export async function deleteById(id){
    return del('/data/games/' +id)
}

export async function editById(id, data){
    return put ('/data/games/'+ id, data)
}
export async function getGamePerCategory() {
    return get('/data/games?sortBy=_createdOn%20desc&distinct=category')
}

export async function getAllCommentsForGame(gameId) {
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}
export async function createNewComment(gameId, comment) {
    return post('/data/comments')
}

