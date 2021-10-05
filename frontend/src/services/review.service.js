import { httpService } from './http.service'

export const reviewService = {
    query,
    add,
    remove
}

async function query(filterBy) {
    var queryStr = '';
    if (filterBy) {
        if (filterBy.userId) {
            queryStr += `?userId=${filterBy.userId}`
        }
        if (filterBy.toyId) {
            queryStr += `?toyId=${filterBy.toyId}`
        }
    }
    return await httpService.get(`review${queryStr}`)
}

async function add(toyId, review) {
    const data = { toyId, review }
    return await httpService.post('review', data)
}

async function remove(reviewId) {
    return await httpService.delete(`review/${reviewId}`)
}


