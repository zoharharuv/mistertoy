const toyService = require('./toy.service.js');
const logger = require('../../services/logger.service')

async function getToys(req, res) {
    try {
        const filter = req.query || null;
        const toys = await toyService.query(filter)
        res.json(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get cars' })
    }
}

async function getToyById(req, res) {
    const { id } = req.params
    try {
        const toy = await toyService.getById(id)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}
async function addToy(req, res) {
    const { _id } = req.session.user
    const toyToSave = req.body;
    try {
        const toy = await toyService.add(toyToSave, _id)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}
async function updateToy(req, res) {
    const toyToSave = req.body;
    try {
        const toy = await toyService.update(toyToSave)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

async function removeToy(req, res) {
    const { id } = req.params
    try {
        const toy = await toyService.remove(id)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}

module.exports = {
    getToys,
    getToyById,
    addToy,
    updateToy,
    removeToy
}

