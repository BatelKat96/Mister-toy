const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')


const COLLECTION_NAME = 'reviews'


async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)

        const collection = await dbService.getCollection(COLLECTION_NAME)

        // const reviews = await collection.find(criteria).toArray()
        // console.log(reviews);
        let reviews = await collection.aggregate([
            // * First we have to match our toys to the agregated values
            {
                $match: criteria
            },
            // * What to look for inside each toy
            {
                // * Get the user object
                $lookup:
                {
                    from: 'users',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                // * Item reutrns as an array - $unwind decostructs the array
                $unwind: '$byUser'
            },
            {
                // * Get the toy object
                $lookup:
                {
                    from: 'toys',
                    localField: 'aboutToyId',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()
        console.log('reviews:', reviews)

        // * Manipulating the original array into a user - safe array
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            review.aboutToy = { _id: review.aboutToy._id, name: review.aboutToy.name, price: review.aboutToy.price }
            // review.createdAt = ObjectId(review._id).getTimestamp()
            delete review.byUserId
            delete review.aboutToyId
            return review
        })
        // console.log('reviews:', reviews)
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        // const store = asyncLocalStorage.getStore()
        // const { loggedinUser } = store
        const collection = await dbService.getCollection(COLLECTION_NAME)
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        // if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    // console.log(ObjectId(review.aboutToyId));
    try {
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutToyId: ObjectId(review.aboutToyId),
            txt: review.txt
        }
        const collection = await dbService.getCollection(COLLECTION_NAME)
        await collection.insertOne(reviewToAdd)
        return reviewToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


