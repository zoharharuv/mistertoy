import { httpService } from './http.service'

export const toyService = {
    query,
    getById,
    save,
    update,
    remove,
}

async function query(filterBy = {}) {
    const filter = { ...filterBy }
    if (filter.inStock === false) {
        delete filter.inStock
    }
    if (filter.labels) filter.labels = filter.labels.join(',')
    return await httpService.get('toy', filter )
}

async function getById(toyId) {
    return await httpService.get(`toy/${toyId}`)
}

async function save(toy) {
    return await httpService.post('toy', toy)
}

async function update(toy) {
    return await httpService.put(`toy/${toy}`, toy)
    
}

async function remove(toyId) {
    return await httpService.delete(`toy/${toyId}`)
}
