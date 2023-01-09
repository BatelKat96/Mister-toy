export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER = 'SET_FILTER'
export const REMOVE_TOY = 'REMOVE_TOY'


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

        default:
            return state
    }


}