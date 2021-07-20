const defaultState = {
	movieDetail: {
		movieReqData: {},
		videoReqData: {},
		castData: [],
		comments: [],
		btnCaption: 'Add to favourites',
		voteAverage: 0
	}
}

const ADD_MOVIE_DETAIL = 'ADD_MOVIE_DETAIL'
const SET_BTN_CAPTION = 'SET_BTN_CAPTION'
const ADD_CAST_DATA = 'ADD_CAST_DATA'
const GET_COMMENTS = 'GET_COMMENTS'

export const movieDetailReducer = (state = defaultState, action) => {
	
	switch (action.type) {
		case ADD_MOVIE_DETAIL:
			return { ...state, movieDetail: action.payload }
		case SET_BTN_CAPTION:
			return { ...state, btnCaption: action.payload }
		case ADD_CAST_DATA:
			return { ...state, castData: [...action.payload] }
		case GET_COMMENTS:
			return { ...state, comments: action.payload }
		default:
			return state
	}
}

export const addMovieDetailAction = (payload) => ({ type: ADD_MOVIE_DETAIL, payload })
export const btnCaptionAction = (payload) => ({ type: SET_BTN_CAPTION, payload })
export const addCastDataAction = (payload) => ({ type: ADD_CAST_DATA, payload })
export const getCommentsAction = (payload) => ({ type: GET_COMMENTS, payload })