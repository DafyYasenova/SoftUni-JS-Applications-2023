import {get, post, put, del} from './api.js'


export async function getAllItems() {
    return get('/data/offers?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/offers/' + id);

}
export async function createItem(data) {
    return post('/data/offers', data)
}

export async function deleteById(id){
    return del('/data/offers/' +id)
}

export async function editById(id, data){
    return put ('/data/offers/'+id , data)
}


// Apply:
export async function applyById(id){
    return post ('/data/applications', id)
}

export async function offerById(offerId){
    return get (`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}
// /data/applications?where=offerId%3D%22{offerId}%22&distinct=_ownerId&count


export async function offerByIdAndUserId(offerId, userId){
    return get (`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

// /data/applications?where=offerId%3D%22{offerId}%22%20and%20_ownerId%3D%22{userId}%22&count