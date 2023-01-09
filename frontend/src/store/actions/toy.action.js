import { toyService } from '../../services/toy-service';
import { REMOVE_TOY, SET_FILTER, SET_IS_LOADING, SET_TOYS } from '../reducers/toy.reducer';
import { store } from '../store';


export function loadToys(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
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
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had issues Removing toy', err)
            throw err
        })
}

export function setFilter(filter) {
    return Promise.resolve(store.dispatch({ type: SET_FILTER, filter }))
}