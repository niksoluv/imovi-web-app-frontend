const defaultState = {
	movies: [],
	pageNumber: 1,
	hasMore: true
}

const ADD_MOVIES = 'ADD_MOVIES'
const REMOVE_MOVIES = 'REMOVE_MOVIES'

export const moviesReducer = (state = defaultState, action) => {
	
	switch (action.type) {
		case ADD_MOVIES:
			return {
				...state,
				movies: [...state.movies, ...action.payload.movies],
				pageNumber: state.pageNumber + 1,
				hasMore: action.payload.hasMore,
				keyword: action.payload.keyword
			}
		case REMOVE_MOVIES:
			return { ...state, movies: [], pageNumber: 1 }
		default:
			return state
	}
}

export const addMoviesAction = (payload) => ({ type: ADD_MOVIES, payload })
export const removeMoviesAction = (payload) => ({ type: REMOVE_MOVIES, payload })