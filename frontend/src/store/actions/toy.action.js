import { toyService } from '../../services/toy-service';
import { ADD_TOY, REMOVE_TOY, SET_FILTER, SET_IS_LOADING, SET_SORT, SET_TOYS, UPDATE_TOY } from '../reducers/toy.reducer';
import { store } from '../store';


export function loadToys(filterBy, sortBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    const { filterBy, sortBy } = store.getState().todoModule

    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading cars', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function removeToy(toyId) {
    console.log('toyId from action:', toyId)

    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had issues Removing toy', err)
            throw err
        })
}



export function saveToy(toy) {
    console.log('toy from action:', toy)

    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            console.log('savedToy:', savedToy)

            store.dispatch({ type, toy: savedToy })
            console.log('seved:')
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}


export function setFilter(filter) {
    return Promise.resolve(store.dispatch({ type: SET_FILTER, filter }))
}

export function setSort(sort) {
    store.dispatch({ type: SET_SORT, sort })
}