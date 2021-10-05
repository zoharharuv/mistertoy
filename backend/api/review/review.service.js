const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection('review')
        const criteria = _buildCriteria(filterBy)
        const reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'userId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup:
                {
                    localField: 'toyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            }
        ]).toArray()
        return reviews.map(review => {
            review.user = { _id: review.userId, fullname: review.user.fullname }
            review.toy = { _id: review.toyId, name: review.toy.name }
            delete review.userId
            delete review.toyId
            return review
        })
    }
    catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!isAdmin) criteria.byUserId = ObjectId(userId)
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            userId: ObjectId(review.userId),
            toyId: ObjectId(review.toyId),
            content: review.content,
            createdAt: Date.now(),
            rating: +review.rating
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filter) {
    const criteria = {}
    if (filter.toyId) {
        criteria.toyId = ObjectId(filter.toyId);
    }
    if (filter.userId) {
        criteria.userId = ObjectId(filter.userId);
    }
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


