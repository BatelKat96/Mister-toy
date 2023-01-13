const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    // console.log('filterBy: from toy server bac', filterBy)
    try {
        const criteria = {
            // toyName: { $regex: filterBy.txt, $options: 'i' }
        }
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            criteria.toyName = { $regex: regex }
        }
        if (filterBy.maxPrice) {
            criteria.price = { $lte: filterBy.maxPrice }
        }

        const collection = await dbService.getCollection('toys')
        var toys = await collection.find(criteria).toArray()
        toys = toys.map(toy => {
            toy.createdAt = +ObjectId(toy._id).getTimestamp()
            return toy
        })
        return toys
    } catch (err) {
        // logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        // logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        // logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        // logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    console.log('toy:', toy)

    try {
        const toyToSave = {
            toyName: toy.toyName,
            price: toy.price,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        console.log('toy after:', toyToSave)

        return toy
    } catch (err) {
        // logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

// async function addCarMsg(carId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('car')
//         await collection.updateOne({ _id: ObjectId(carId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add car msg ${carId}`, err)
//         throw err
//     }
// }

// async function removeCarMsg(carId, msgId) {
//     try {
//         const collection = await dbService.getCollection('car')
//         await collection.updateOne({ _id: ObjectId(carId) }, { $pull: { msgs: {id: msgId} } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add car msg ${carId}`, err)
//         throw err
//     }
// }

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    // addCarMsg,
    // removeCarMsg
}
