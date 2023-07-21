import {get, post, put, del}from './api.js'


export async function getAllItems() {
    return get('/data/albums?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/' + id);

}
export async function createItem(ideaData) {
    return post('', ideaData)
}

export async function deleteById(id){
    return del('' +id)
}

export async function editById(id){
    return put ('...')
}