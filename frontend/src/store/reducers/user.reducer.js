
import { userService } from '../../services/user.service'


export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'



const initialState = {
    user: userService.getLoggedinUser(),
    watchedUser: null
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case SET_WATCHED_USER:
            return { ...state, watchedUser: action.user }
        default:
            return state
    }
}


