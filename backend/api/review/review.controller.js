const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const toyService = require('../toy/toy.service')
// const socketService = require('../../services/socket.service')
const reviewService = require('./review.service')

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function addReview(req, res) {
    try {
        const reviewToSend = req.body.review;
        reviewToSend.toyId = req.body.toyId
        reviewToSend.userId = req.session.user._id

        const review = await reviewService.add(reviewToSend)
        
        // prepare the updated review for sending out
        review.toy = await toyService.getById(review.toyId)
        
        const user = await userService.getById(review.userId)
        review.user = user
        
        res.send(review)
    } catch (err) {
        console.log(err)
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}