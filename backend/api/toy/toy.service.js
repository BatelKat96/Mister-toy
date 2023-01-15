const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removetoyMsg
}

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
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.insertOne(toy)

        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    // console.log('toy:', toy)
    try {
        const toyToSave = {
            toyName: toy.toyName,
            price: toy.price,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        // console.log('toy after:', toyToSave)

        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg, loggedinUser) {
    try {
        const msgToSave = {
            ...msg,
            by: {
                fullname: loggedinUser.fullname,
                _id: loggedinUser._id
            }
        }
        // msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msgToSave } })
        return msgToSave
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removetoyMsg(toyId, msgId, loggedinUser) {
    try {
        // console.log('loggedinUser:', loggedinUser)
        let msg = await getByIdMsg(toyId, msgId)
        if (msg.by._id !== loggedinUser._id && !loggedinUser.isAdmin) throw new Error('Not your msg!')

        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}



async function getByIdMsg(toyId, msgId) {
    try {
        const toy = await getById(toyId)
        console.log('toy:', toy)

        const msg = toy.msgs.find(msg => msg.id === msgId)
        return msg
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}