import { toyService } from '../../services/toy-service';
import { ADD_TOY, REMOVE_TOY, SET_FILTER, SET_IS_LOADING, SET_SORT, SET_TOYS, UPDATE_TOY } from '../reducers/toy.reducer';
import { store } from '../store';


export async function loadToys(filterBy, sortBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filterBy)
        if (sortBy) {
            if (sortBy.sortByCat === 'createdAt' || sortBy.sortByCat === 'price') {
                toys.sort((b1, b2) => (b1[sortBy.sortByCat] - b2[sortBy.sortByCat]) * sortBy.desc)
            }
            if (sortBy.sortByCat === 'toyName') {
                toys.sort((b1, b2) => b1.toyName.localeCompare(b2.toyName) * sortBy.desc)
            }
        }
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    }
    catch (err) {
        console.log('Had issues loading toys', err)
        throw err
    }
    finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        return toyId
    }
    catch (err) {
        console.log('Had issues Removing toy', err)
        throw err
    }
}


export async function saveToy(toy) {
    console.log('toy from toy action:', toy)

    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        console.log('savedToy from try action:', savedToy)

        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Cannot save toy:', err)
        throw err
    }
}


export async function setFilter(filter) {
    return Promise.resolve(store.dispatch({ type: SET_FILTER, filter }))
}

export async function setSort(sort) {
    // console.log('sortxxx:', sort)
    store.dispatch({ type: SET_SORT, sort })
}