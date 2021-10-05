const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}

function _buildCriteria(filter) {
    const criteria = {};
    if (filter.name) {
        criteria.name = { $regex: filter.name, $options: 'i' };
    }
    if (filter.inStock) {
        criteria.inStock = { $eq: true };
    }
    if (filter.labels) {
        filter.labels = filter.labels.split(',');
        if (filter.labels.length > 0) {
            criteria.labels = { $all: [...filter.labels] };
        }
    }
    return criteria
}

async function query(filter = null) {
    const criteria = filter ? _buildCriteria(filter) : {}
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()

        if (filter.status) {
            const { status } = filter;
            if (status === 'name') {
                toys.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (status === 'price') {
                toys.sort((a, b) => a.price - b.price)
            }
            if (status === 'created') {
                toys.sort((a, b) => b.createdAt - a.createdAt);
            }
        }

        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error('cannot find toy by ID: ', toyId, 'error: ', err)
        throw err
    }
}

async function add(toy, userId = null) {
    console.log(userId);
    const id = ObjectId();
    toy._id = id;
    toy.price = +toy.price;
    toy.createdAt = Date.now();
    toy.inStock = Math.random() > 0.5 ? true : false;
    toy.reviews = [];
    if (toy.labels.length) toy.labels = toy.labels.map(label => label.label)
    try {
        const collection = await dbService.getCollection('toy');
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error(`cannot add toy ${toy}`, err)
        throw err
    }
}

async function update(toy) {
    var id = ObjectId(toy._id);
    delete toy._id;
    toy.price = +toy.price;
    try {
        const collection = await dbService.getCollection('toy');
        await collection.updateOne({ "_id": id }, { $set: { ...toy } })
        toy._id = id;
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${id}`, err)
        throw err
    }
}

async function remove(toyId) {
    const id = ObjectId(toyId)
    try {
        const collection = await dbService.getCollection('toy');
        const toy = await collection.findOne({ "_id": id })
        await collection.remove({ "_id": id })
        return toy
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}
