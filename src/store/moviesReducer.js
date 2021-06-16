const defaultState = {
	movies: []
}

const ADD_MOVIES = 'ADD_MOVIES'

export const moviesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_MOVIES:
			return { ...state, movies: [...action.payload] }

		default:
			return state
	}
}

export const addMoviesAction = (payload) => ({ type: ADD_MOVIES, payload })