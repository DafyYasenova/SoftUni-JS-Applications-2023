import {get, post, put, del}from './api.js'


export async function getAllItems() {
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name')
}

export async function getById(id) {
    return get('/data/albums/' + id);

}
export async function createItem(data) {
    return post('/data/albums', data)
}

export async function deleteById(id){
    return del('/data/albums/' +id)
}

export async function editById(id, data){
    return put ('/data/albums/' + id, data)
}

export async function searchById(query){
    return get (`/data/albums?where=name%20LIKE%20%22${query}%22`)
}