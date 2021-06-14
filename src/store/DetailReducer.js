const defaultState = {
	movieDetail: {
		movieReqData:{},
		videoReqData:{}
	}
}

const ADD_MOVIE_DETAIL = 'ADD_MOVIE_DETAIL'

export const movieDetailReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_MOVIE_DETAIL:
			return { ...state, movieDetail: action.payload }

		default:
			return state
	}
}

export const addMovieDetailAction = (payload) => ({ type: ADD_MOVIE_DETAIL, payload })