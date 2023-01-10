const fs = require('fs');
var toys = require('../data/toy.json')


module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy, sortBy) {
    if (!filterBy) return Promise.resolve(toys)

    let filterToys = toys

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        filterToys = filterToys.filter(toy => regex.test(toy.toyName))
    }
    if (filterBy.maxPrice) {
        filterToys = filterToys.filter(toy => toy.price <= filterBy.maxPrice)
    }
    if (sortBy) {
        if (sortBy.sortByCat === 'createdAt' || sortBy.sortByCat === 'price') {
            filterToys.sort((b1, b2) => (b1[sortBy.sortByCat] - b2[sortBy.sortByCat]) * sortBy.desc)
        }
        if (sortBy.sortByCat === 'toyName') {
            filterToys.sort((b1, b2) => b1.toyName.localeCompare(b2.toyName) * sortBy.desc)
        }
    }

    return Promise.resolve(filterToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _writeToysToFile()
}


function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')

        toyToUpdate.toyName = toy.toyName
        toyToUpdate.price = toy.price
        toyToUpdate.inStock = toy.inStock
        toyToUpdate.labels = toy.labels
        toyToUpdate.createdAt = toy.createdAt
    } else {
        toy.createdAt = new Date(Date.now());
        toy._id = _makeId()
        toys.unshift(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}