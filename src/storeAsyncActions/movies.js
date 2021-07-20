import axios from 'axios'
import { addMoviesAction, removeMoviesAction } from '../store/moviesReducer'
import { addMovieDetailAction, btnCaptionAction, addCastDataAction, getCommentsAction } from '../store/detailReducer'
import { loginAction, registerAction, logoutAction } from '../store/authReducer'
const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'

export const fetchMovies = (url, keyword, pageNumber) => {

	if (url == 'fav') {
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


			const payload = {
				movies: res.map(el => el.data),
				hasMore: false
			}
			dispatch(addMoviesAction(payload))
		}
	}
	else if (url == 'popular') {
		return async dispatch => {
			const res = await axios.get(popularUrl)
			const payload = {
				movies: res.data.results,
				hasMore: false
			}
			dispatch(addMoviesAction(payload))
		}
	}
	else {
		switch (url) {
			case 'top':
				return async dispatch => {
					const res = await axios.get(`https://api.themoviedb.org/3/movie
					/top_rated?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US
					&page=${pageNumber}`)
					const payload = {
						movies: res.data.results,
						hasMore: res.data.total_pages > pageNumber
					}
					dispatch(addMoviesAction(payload))
				}
			case 'upcoming':
				return async dispatch => {
					const res = await axios.get(`https://api.themoviedb.org/3/movie
					/upcoming?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US
					&page=${pageNumber}`)
					const payload = {
						movies: res.data.results,
						hasMore: res.data.total_pages > pageNumber
					}
					dispatch(addMoviesAction(payload))
				}
			case 'nowplaying':
				return async dispatch => {
					const res = await axios.get(`https://api.themoviedb.org/3/movie
					/now_playing?api_key=30c4ec1f7ead936d610a56b54bc4bbd4
					&language=en-US&page=${pageNumber}`)
					const payload = {
						movies: res.data.results,
						hasMore: res.data.total_pages > pageNumber
					}
					dispatch(addMoviesAction(payload))
				}
			case 'search':
				return async dispatch => {
					const url =
						'https://api.themoviedb.org/3/search/movie?api_key=30c4ec1f7ead936d610a56b54bc4bbd4'
						+ '&query=' + keyword + `&page=${pageNumber}/&include_adult=false`
					const res = await axios.get(url)
					debugger
					const payload = {
						movies: res.data.results,
						hasMore: res.data.total_pages > pageNumber,
						keyword: keyword
					}
					dispatch(addMoviesAction(payload))
				}
			default:
				return async dispatch => {
					const res = await axios.get(popularUrl)
					const payload = {
						movies: res.data.results,
						hasMore: false
					}
					dispatch(addMoviesAction(payload))
				}
		}
	}

}

export const removeMovies = () => {
	return dispatch => {
		dispatch(removeMoviesAction())
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
		let btnCaption = 'Add to favourites'
		let k = []

		try {
			const response = await axios.get('https://localhost:44311/api/favoritemovies', { withCredentials: true })
			k = response.data.filter(el => el.movieId === movieId)


			if (k.length > 0)
				btnCaption = 'Remove from favourites'
		}
		catch (e) {
			console.log(e)
			//dispatch(btnCaptionAction(btnCaption))
		}


		dispatch(btnCaptionAction(btnCaption))
	}
}

export const addMovieToFav = (movieId) => {
	return async dispatch => {
		const addResponse = await axios.post('https://localhost:44311/api/favoritemovies', { MovieId: movieId }, { withCredentials: true })

		if (addResponse.data !== 'exists') {
			dispatch(btnCaptionAction('Remove from favourites'))
		}
		else {
			console.log('Movie wasn`t added to favorites!')
			const deleteResponse = await axios.delete('https://localhost:44311/api/favoritemovies/' + movieId, { withCredentials: true })
			if (deleteResponse.status === 200) {
				dispatch(btnCaptionAction('Add to favourites'))
			}
		}
	}
}

export const login = (user) => {
	return async dispatch => {
		let userData = {}
		const response = await axios.get('https://localhost:44311/api/users/login', {
			withCredentials: true,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
			}
		}
		)
		const data = response.data
		if (response.status === 200) {
			userData = {
				id: data['id'],
				name: data['name'],
				email: data['email'],
				password: data['password'],
				registrationDate: data['registrationDate'],
				birthDate: data['birthDate']
			}
			dispatch(loginAction(userData))
		}
		dispatch(loginAction(userData))
	}
}

export const register = (user) => {
	return async dispatch => {
		let userData = {}
		const response = await axios.post('https://localhost:44311/api/users/register', user, { withCredentials: true })
		console.log(response)
		const data = response.data

		if (response.status === 400)
			alert('Email or username is already used. Please, try another one.')
		else if (response.status === 200) {
			userData = {
				id: data['id'],
				name: data['name'],
				email: data['email'],
				password: data['password'],
				registrationDate: data['registrationDate'],
				birthDate: data['birthDate']
			}
			dispatch(registerAction(userData))
		}
	}
}

export const getCurrentUserData = () => {
	return async dispatch => {
		let userData = {}
		const response = await axios.get('https://localhost:44311/api/users/current', {
			withCredentials: true,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Basic'
			}
		}
		)
		const data = response.data
		if (response.status === 200) {
			userData = {
				id: data.id,
				name: data.name,
				email: data.email,
				password: data.password,
				registrationDate: data.registrationDate,
				birthDate: data.birthDate,
				profileColors: data.profileColors.map(color=>color.color)
			}
		
			dispatch(loginAction(userData))
		}

		dispatch(loginAction(userData))
	}
}

export const logout = () => {
	return async dispatch => {
		try {
			let userData = {}
			await axios.get('https://localhost:44311/api/users/logout',
				{
					withCredentials: true,
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Basic'
					}
				})
			dispatch(logoutAction(userData))
		} catch (e) {
			console.log(e)
		}
	}
}

export const getCast = (movieId) => {
	return async dispatch => {

		const res = await axios.get('https://api.themoviedb.org/3/movie/'
			+ movieId
			+ '/credits?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US')
		dispatch(addCastDataAction(res.data.cast))
	}
}

export const getComments = (movieId) => {
	return async dispatch => {

		const usersRes = await axios.get('https://localhost:44311/api/users')
		var users = []
		var comments = []

		Object.keys(usersRes.data).forEach((property) => {
			users.push({
				username: usersRes.data[property].name,
				userId: usersRes.data[property].id
			})
		})

		const commentsRes = await axios.get('https://localhost:44311/api/comments/' + movieId)

		Object.keys(commentsRes.data).forEach((property) => {
			comments.push({
				id: commentsRes.data[property].id,
				movieId: commentsRes.data[property].movieId,
				name: users.find(user => user.userId === commentsRes.data[property].userId).username,
				text: commentsRes.data[property].text,
				date: commentsRes.data[property].date,
				rating: commentsRes.data[property].rating
			})
		})

		dispatch(getCommentsAction(comments))
	}
}

export const addComment = (comment) => {

	return async dispatch => {
		await axios.post('https://localhost:44311/api/comments/add', { movieId: comment.movieId, text: comment.text, rating: comment.rating }, { withCredentials: true })
	}
}
