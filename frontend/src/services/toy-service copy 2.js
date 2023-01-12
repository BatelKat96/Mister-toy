import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const labels = ["On wheels", "Box game", "Art", "Baby",
    "Doll", "Puzzle", "Outdoor", "Battery Powered"]

const STORAGE_TOYS_KEY = 'toyDB'
// _createToys()
// const BASE_URL = 'toy'
export const toyService = {
    query,
    remove,
    getById,
    save,
    getDefaultFilter,
    getDefaultSort,
    getEmptyToy
}

function query(filterBy, sortBy) {


    // const queryParams = `?txt=${filterBy.txt}&maxPrice=${filterBy.maxPrice}&inStock=${filterBy.inStock}&sortByCat=${sortBy.sortByCat}&desc=${sortBy.desc}`
    // return httpService.get(BASE_URL + queryParams)
    return httpService.get('toy', { params: { filterBy, sortBy } })

}

function remove(toyId) {
    console.log('toyId from service fr:', toyId)

    return httpService.delete(`toy/${toyId}`)
}


function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
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

function _createToy(toyName, price, labels, inStock, imgUrl = null) {
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
    return { txt: '', maxPrice: '', inStock: '' }
}

function getDefaultSort() {
    return { sortByCat: '', desc: 1 }
}

