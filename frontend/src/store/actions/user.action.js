import { store } from '../store'

import { userService } from '../../services/user.service'
import { SET_USER } from '../reducers/user.reducer.js'

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot signup:', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}

export async function loadUsers() {
    try {
        store.dispatch({ type: 'LOADING_START' })
        const users = await userService.getUsers()
        store.dispatch({ type: 'SET_USERS', users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: 'LOADING_DONE' })
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    } catch (err) {
        // showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
        throw err
    }
}