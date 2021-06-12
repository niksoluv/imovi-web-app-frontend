import { GET_MOVIE_DETAIL, MOVIE_DETAIL_ERROR } from '../types'
import axios from 'axios'

export const getDetailData = (movieId) => async dispatch => {
	try {
		let url = 'https://api.themoviedb.org/3/movie/'
			+ movieId
			+ '?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
		const movieReq = await axios.get(url)
		//const movieData = await axios.all(reqArr)

		url = 'https://api.themoviedb.org/3/movie/'
			+ movieId
			+ '/videos?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'

		const videoReq = await axios.get(url)
		//const videoData = await axios.all(reqArr)



		dispatch({
			type: GET_MOVIE_DETAIL,
			movieData: movieReq.data,
			videoData: videoReq.data.results[0]
		})
	}
	catch (e) {
		dispatch({
			type: MOVIE_DETAIL_ERROR,
			movieData: console.log(e),
			videoDatta: console.log(e)
		})
	}
}