import {get, post, put, del} from './api.js'


export async function getAllItems() {
    return get('/data/shoes?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/shoes/' + id);

}
export async function createItem(data) {
    return post('/data/shoes', data)
}

export async function deleteById(id){
    return del('/data/shoes/' +id)
}

export async function editById(id, data){
    return put ('/data/shoes/'+ id, data)
}
export async function searchById(query){
    return get (`/data/shoes?where=brand%20LIKE%20%22${query}%22`)
}
