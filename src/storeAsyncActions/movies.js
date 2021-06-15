import axios from 'axios'
import { addMoviesAction } from '../store/moviesReducer'
import { addMovieDetailAction, btnCaptionAction } from '../store/DetailReducer'
const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'

export const fetchMovies = (url) => {
	if (url === 'fav') {
		return async dispatch => {
			const ids = []
			const response = await axios.get('https://localhost:44311/api/favoritemovies', { withCredentials: true })

			Object.keys(response.data).forEach((property) => {
				ids.push(response.data[property].movieId)
			})

			const reqArr = ids.map(id => axios.get("https://api.themoviedb.org/3/movie/"
				+ id
				+ "?api_key=30c4ec1f7ead936d610a56b54bc4bbd4"))

			const res = await axios.all(reqArr)

			const payload = res.map(el => el.data)
			dispatch(addMoviesAction(payload))
		}
	}
	return async dispatch => {
		const res = await axios.get(popularUrl)
		dispatch(addMoviesAction(res.data.results))
	}
}

export const fetchMovieDetail = (movieId) => {
	return async dispatch => {
		let url = 'https://api.themoviedb.org/3/movie/'
			+ movieId
			+ '?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
		const movieReq = await axios.get(url)
		movieReq.data.genres = JSON.stringify(movieReq.data.genres)
		url = 'https://api.themoviedb.org/3/movie/'
			+ movieId
			+ '/videos?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'

		const videoReq = await axios.get(url)

		const res = {
			movieReqData: movieReq.data,
			videoReqData: videoReq.data
		}

		dispatch(addMovieDetailAction(res))
	}
}

export const isMovieInFavourites = (movieId) => {
	return async dispatch => {
		const response = await axios.get('https://localhost:44311/api/favoritemovies', { withCredentials: true })

		let btnCaption = 'Add to favourites'
		const k = response.data.filter(el => el.movieId == movieId)

		if (k.length > 0)
			btnCaption = 'Remove from favourites'
		dispatch(btnCaptionAction(btnCaption))
	}
}

export const addMovieToFav = (movieId) => {
	return async dispatch => {
		const addResponse = await axios.post('https://localhost:44311/api/favoritemovies', { MovieId: movieId }, { withCredentials: true })
		debugger
		if (addResponse.data != 'exists') {
			dispatch(btnCaptionAction('Remove from favourites'))
		}
		else {
			debugger
			console.log('Movie wasn`t added to favorites!')
			const deleteResponse = await axios.delete('https://localhost:44311/api/favoritemovies/' + movieId, { withCredentials: true })
			if (deleteResponse.status === 200) {
				dispatch(btnCaptionAction('Add to favourites'))
			}
		}
	}
}