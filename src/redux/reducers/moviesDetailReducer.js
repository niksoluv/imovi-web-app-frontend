import {  GET_MOVIE_DETAIL } from '../types'

const initialState = {
	movieData: {},
	//videoData: {},
	loading: true
}

export default function (state = initialState, action) {

	switch (action.type) {

		case GET_MOVIE_DETAIL:
			return {
				...state,
				movieData: action.movieData,
				//videoData: action.videoData,
				loading: false
			}
		default: return state
	}

}