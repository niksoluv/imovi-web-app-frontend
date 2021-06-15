import { GET_USERS, GET_MOVIE_DETAIL } from '../types'

const initialState = {
	movies: [],
	loading: true
}

export default function (state = initialState, action) {

	switch (action.type) {

		case GET_USERS:
			return {
				...state,
				movies: action.payload,
				loading: false
			}

		default: return state
	}

}

