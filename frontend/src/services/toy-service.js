import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const labels = ["On wheels", "Box game", "Art", "Baby",
    "Doll", "Puzzle", "Outdoor", "Battery Powered"]

const STORAGE_TOYS_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    remove,
    getById,
    save,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    return storageService.query(STORAGE_TOYS_KEY)
        .then(toys => {
            let filterToys = toys
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                filterToys = filterToys.filter(toy => regex.test(toy.toyName))
            }
            if (filterBy.maxPrice) {
                filterToys = filterToys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            if (sortBy.txt > 0) {
                filterToys = filterToys.sort((a, b) => a.toyName.localeCompare(b.toyName))
            }
            if (sortBy.txt < 0) {
                filterToys = filterToys.sort((a, b) => a.toyName.localeCompare(b.toyName))
            }
            return filterToys
        })
}

function remove(toyId) {
    return storageService.remove(STORAGE_TOYS_KEY, toyId)
}
function getById(toyId) {
    return storageService.get(STORAGE_TOYS_KEY, toyId)
}

function save(toy) {
    console.log('toy from service:', toy)

    if (toy._id) {
        console.log('yes:')

        return storageService.put(STORAGE_TOYS_KEY, toy)
    } else {
        // car.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_TOYS_KEY, toy)
    }
}

function getEmptyToy(toyName, price, labels, inStock = true) {
    return { toyName, price, labels, inStock }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_TOYS_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking Doll', 18, ['Doll', 'Battery Powered'], true, 'doll.jpg'))
        toys.push(_createToy('Frozen Pazzle', 23, ['Puzzle', 'Box game'], true, 'frozen.jpg'))
        toys.push(_createToy('Race Car', 25, ['On wheels', 'Battery Powered'], false, 'car.jpg'))
        toys.push(_createToy('Bimba', 30, ['Baby', 'Outdoor'], false, 'bimba.jpeg'))
        toys.push(_createToy('Colors Cards', 17, ['Box game', 'Baby'], true, 'cards.jpg'))

        utilService.saveToStorage(STORAGE_TOYS_KEY, toys)
    }
}

function _createToy(toyName, price, labels, inStock, imgUrl) {
    return {
        _id: utilService.makeId(),
        toyName,
        price,
        labels,
        inStock,
        createAt: 1631031801011,
        imgUrl
    }
}



function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: '', label: '' }
}

function getDefaultSort() {
    return { txt: '' }
}