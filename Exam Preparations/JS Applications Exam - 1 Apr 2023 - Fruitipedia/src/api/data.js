import {get, post, put, del} from './api.js'


export async function getAllItems() {
    return get('/data/fruits?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/fruits/' + id);

}
export async function createItem(data) {
    return post('/data/fruits', data)
}

export async function deleteById(id){
    return del('/data/fruits/' +id)
}

export async function editById(id, data){
    return put ('/data/fruits/'+ id, data)
}
// search
export async function searchById(query){
    return get (`/data/fruits?where=name%20LIKE%20%22${query}%22`)
}

