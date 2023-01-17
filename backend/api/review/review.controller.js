const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const toyService = require('../toy/toy.service')
const authService = require('../auth/auth.service')
// const socketService = require('../../services/socket.service')
const reviewService = require('./review.service')
const asyncLocalStorage = require('../../services/als.service')

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        const deletedCount = await reviewService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove review' })
        }
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}


async function addReview(req, res) {
    console.log('HIIIIII')
    const alsStore = asyncLocalStorage.getStore()
    const { loggedinUser } = alsStore

    try {
        var review = req.body
        review.byUserId = loggedinUser._id
        review = await reviewService.add(review)
        // console.log('reviewBefore:', review)
        // prepare the updated review for sending out
        review.aboutToy = await toyService.getById(review.aboutToyId)
        // console.log('fff', review.aboutToyId);

        // loggedinUser = await userService.update(loggedinUser)
        // console.log('after saving bla');
        // console.log('loggedinUser:', loggedinUser)

        // review.byUserId = loggedinUser

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        // console.log('loginToken:', loginToken)

        res.cookie('loginToken', loginToken)

        delete review.aboutToyId
        delete review.byUserId

        // socketService.broadcast({type: 'review-added', data: review, userId: loggedinUser._id})
        // socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutUser._id})

        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})
        // console.log('review:', review)
        res.send(review)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}