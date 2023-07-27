import {get, post, put, del} from './api.js'


export async function getAllItems() {
    return get('/data/events?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/events/' + id);

}
export async function createItem(data) {
    return post('/data/events', data)
}

export async function deleteById(id){
    return del('/data/events/' +id)
}

export async function editById(id, data){
    return put ('/data/events/'+ id, data)
}

export async function eventById( id){
    return post ('/data/going', id)
}

export async function eventCount(eventId){
    return get (`/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`)
}

export async function eventByUser(eventId, userId){
    return get (`/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
