import { GET_USERS, USERS_ERROR } from '../types'
import axios from 'axios'

let ids = [337404, 503736, 578701, 808023, 635302]

export const getPopular = (url) => async dispatch => {
	if (url == 'fav') {

		try {
			const reqArr = ids.map(id => axios.get("https://api.themoviedb.org/3/movie/"
				+ id
				+ "?api_key=30c4ec1f7ead936d610a56b54bc4bbd4"))

			const res = await axios.all(reqArr)
			console.log(res)
			dispatch({
				type: GET_USERS,
				payload: res.map(el=>el.data)
			})
		}
		catch (e) {
			dispatch({
				type: USERS_ERROR,
				payload: console.log(e),
			})
		}
	}
	else {
		try {
			const res = await axios.get(url)

			dispatch({
				type: GET_USERS,
				payload: res.data.results
			})
		}
		catch (e) {
			dispatch({
				type: USERS_ERROR,
				payload: console.log(e),
			})
		}
	}

}