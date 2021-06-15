import axios from 'axios'
import { addMoviesAction } from '../store/moviesReducer'
import { addMovieDetailAction } from '../store/DetailReducer'
const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'

export const fetchMovies = () => {
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