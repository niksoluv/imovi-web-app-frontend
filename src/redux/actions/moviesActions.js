import { GET_USERS, USERS_ERROR } from '../types'
import axios from 'axios'

var ids = []


export const getPopular = (url) => async dispatch => {
	if (url === 'fav') {
		try {
			const response = await axios.get('https://localhost:44311/api/favoritemovies', {withCredentials: true})

			Object.keys(response.data).forEach((property) => {
				ids.push(response.data[property].movieId)
			})
				
			console.log('Favorite movie IDs: ' + ids)
			if (ids.length == 0)
				alert('You have no favorite movies! You can add someone in movie details')
				
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