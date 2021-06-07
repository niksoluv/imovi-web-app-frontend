

let store = {
	_state: {
		moviesPage: {
			movies: []
		},
		deetailsPage: {
			movie: undefined
		},
		profilePage: {

		}
	},
	getState() {
		return this._state
	},
	getMovies() {
		return this._state.moviesPage.movies
	},
	searchMovies() {
		const url = 'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
		fetch(url)
			.then((response) => response.json())
			.then(result => {
				this._state.moviesPage.movies = result['results']
			});
	}
}

export default store