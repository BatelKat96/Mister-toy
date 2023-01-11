const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const toyService = require('./services/toy.service.js')

const app = express()

// App configuration
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))


if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.resolve(__dirname, 'public')))
    app.use(express.static('public'))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}



// Real routing express
// List
app.get('/api/toy', (req, res) => {
    console.log('req.query.params:', req.query.params)

    const { filterBy, sortBy } = req.query.params

    toyService.query(filterBy, sortBy)
        .then((toys) => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send({ msg: 'Had issues getting toys' })
        })
})

// Read - GetById
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Had issues getting toy', err)
            res.status(400).send({ msg: 'Had issues getting toy' })
        })
})

// Update
app.put('/api/toy/:toyId', (req, res) => {

    const toy = req.body
    console.log('TOY ---------', toy)
    toyService.save(toy)
        .then((savedtoy) => {
            res.send(savedtoy)
        })
        .catch(err => {
            console.log('Had issues updating toy', err)
            res.status(400).send({ msg: 'Had issues updating toy' })
        })
})

// Create
app.post('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedtoy) => {
            res.send(savedtoy)
        })
        .catch(err => {
            console.log('Had issues adding toy', err)
            res.status(400).send({ msg: 'Had issues adding toy' })
        })
})


// Remove
app.delete('/api/toy/:toyId', (req, res) => {
    console.log('req.params:', req.params)

    const { toyId } = req.params
    console.log('toyId: from server', toyId)

    toyService.remove(toyId)
        .then(() => {
            res.send({ msg: 'Toy removed successfully', toyId })
        })
        .catch(err => {
            console.log('Had issues deleting toy', err)
            res.status(400).send({ msg: 'Had issues deleteing toy' })
        })
})

const port = 3030
// Listen will always be the last line in our server!
app.listen(port, () => console.log(`Server listening on port ${port}!`))



