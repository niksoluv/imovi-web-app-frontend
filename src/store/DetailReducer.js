const defaultState = {
	movieDetail: {
		movieReqData: {},
		videoReqData: {},
		castData: [],
		btnCaption: 'Add to favourites'
	}
}

const ADD_MOVIE_DETAIL = 'ADD_MOVIE_DETAIL'
const SET_BTN_CAPTION = 'SET_BTN_CAPTION'
const ADD_CAST_DATA = 'ADD_CAST_DATA'

export const movieDetailReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_MOVIE_DETAIL:
			debugger
			return { ...state, movieDetail: action.payload }
		case SET_BTN_CAPTION:
			return { ...state, btnCaption: action.payload }
		case ADD_CAST_DATA:
			return { ...state, castData: [...action.payload] }
		default:
			return state
	}
}

export const addMovieDetailAction = (payload) => ({ type: ADD_MOVIE_DETAIL, payload })
export const btnCaptionAction = (payload) => ({ type: SET_BTN_CAPTION, payload })
export const addCastDataAction = (payload) => ({ type: ADD_CAST_DATA, payload })