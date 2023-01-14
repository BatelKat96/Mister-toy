const toyService = require('./toy.service.js')

const logger = require('../../services/logger.service')

async function getToys(req, res) {
  const filterByPath = req.query.params.filterBy

  try {
    logger.debug('Getting Toys')
    const filterBy = {
      txt: filterByPath.txt,
      maxPrice: +filterByPath.maxPrice,
      inStock: filterByPath.inStock
    }
    // console.log('filterBy controller:', filterBy)

    const toys = await toyService.query(filterBy)
    res.json(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    const toy = await toyService.getById(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

async function addToy(req, res) {
  const { loggedinUser } = req
  console.log('loggedinUser:', loggedinUser)
  console.log('req.body:', req.body)


  try {
    const toy = req.body
    toy.owner = loggedinUser
    const addedtoy = await toyService.add(toy)
    res.json(addedtoy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}


async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

// async function addCarMsg(req, res) {
//   const {loggedinUser} = req
//   try {
//     const carId = req.params.id
//     const msg = {
//       txt: req.body.txt,
//       by: loggedinUser
//     }
//     const savedMsg = await carService.addCarMsg(carId, msg)
//     res.json(savedMsg)
//   } catch (err) {
//     logger.error('Failed to update car', err)
//     res.status(500).send({ err: 'Failed to update car' })

//   }
// }

// async function removeCarMsg(req, res) {
//   const {loggedinUser} = req
//   try {
//     const carId = req.params.id
//     const {msgId} = req.params

//     const removedId = await carService.removeCarMsg(carId, msgId)
//     res.send(removedId)
//   } catch (err) {
//     logger.error('Failed to remove car msg', err)
//     res.status(500).send({ err: 'Failed to remove car msg' })

//   }
// }

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  // addToyMsg,
  // removeToyMsg
}
