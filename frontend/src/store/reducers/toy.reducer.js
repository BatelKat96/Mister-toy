export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER = 'SET_FILTER'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const ADD_TOY = 'ADD_TOY'


const initialState = {
    toys: [],
    isLoading: false
}


export function toyReducer(state = initialState, action) {

    let toys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case SET_FILTER:
            return { ...state, filterBy: action.filter }

        case REMOVE_TOY:
            toys = state.toys.filter(c => c._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        default:
            return state
    }


}