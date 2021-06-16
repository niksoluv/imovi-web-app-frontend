import styles from './Details.module.css'
import { Component } from 'react';
import CastContainer from './cast/CastContainer';
import { connect } from 'react-redux';
import { fetchMovieDetail } from '../../storeAsyncActions/movies';
import Button from './button/Button';

// const useAxios = makeUseAxios({
// 	axios: axios.create({ baseURL: '' })
// })

// const movieToFavorite = (movieId) => {
// 	if (movieId) {
// 		const addResponse = axios.post('https://localhost:44311/api/favoritemovies', {MovieId: movieId}, {withCredentials: true})

// 		if (addResponse.status === 200){
// 			console.log('Movie ' + movieId + ' added to favorites for user')
// 			alert('Added to favorites!')
// 		}
// 		else{
// 			console.log('Movie wasn`t added to favorites!')
// 			const deleteResponse = axios.delete('https://localhost:44311/api/favoritemovies/' + movieId, {withCredentials: true})
// 			if (deleteResponse.status === 200){
// 				console.log('Movie removed from favorites!')
// 			}
// 		}
// 	}
// }

// const Details = (props) => {
// 	const movieId = props.id

// 	const [{ data: movieData, loading: movieLoading, error: getError }] = useAxios(
// 		'https://api.themoviedb.org/3/movie/'
// 		+ movieId
// 		+ '?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
// 	)
// 	const [{ data: videoData, loading: videoLoading, error: getError2 }] = useAxios(
// 		'https://api.themoviedb.org/3/movie/'
// 		+ movieId
// 		+ '/videos?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
// 	)

// 	//check if movie in favourites
// 	var favMoviesIds = []
// 	axios.get('https://localhost:44311/api/favoritemovies', {withCredentials: true}).then(
// 		(response) => Object.keys(response.data).forEach((property) => {
// 			favMoviesIds.push(response.data[property].movieId)
// 		})
// 	)

// 	const isFavorite = favMoviesIds.includes(movieId) ? true : false; 
// 	var btnCaption = isFavorite ? 'Remove from favorites' : 'Add to favorites' //button caption

// 	if (movieLoading || videoLoading) return 'Loading...'
// 	if (getError || getError2) return 'Error...'

// 	//console.log(movieData.production_countries[0].iso_3166_1)
// 	const releaseDate = movieData.release_date + ' ' + movieData.production_countries[0].iso_3166_1
// 	const imageUrl = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path
// 	const genres = movieData.genres.map(el => el.name).join(', ')
// 	const videoKey = videoData.results[0].key
// 	//console.log(movieData)
// 	return (
// 		<div>
// 			<div className={styles.detailsWrapper}>
// 				<div className={styles.detailsImage}>
// 					<img src={imageUrl} alt={movieData.original_title} title={movieData.original_title} />
// 				</div>
// 				<div className={styles.content}>
// 					<article><h5>{movieData.original_title}</h5></article>
// 					<data>Release: {releaseDate}</data>
// 					<div>Tagline: {movieData.tagline}</div>
// 					<div>Budget: {movieData.budget}$</div>
// 					<div>Duration: {movieData.runtime}min.</div>
// 					<div>Genres: {genres}</div>
// 					<button onClick={movieToFavorite.bind(this, movieId)}>{btnCaption}</button>
// 				</div>

// 			</div>
// 			<div className={styles.info}>
// 				<div>
// 					<div>Overview</div>
// 					<div>{movieData.overview}</div>
// 				</div>
// 			</div>
// 			<div className={styles.video}>
// 				<iframe allowFullScreen={true} src={'https://www.youtube.com/embed/' + videoKey}
// 					title='title'>
// 				</iframe>
// 			</div>
// 			<div className={styles.cast}>
// 				<CastContainer id={movieId} />
// 			</div>
// 		</div>
// 	)
// }
// export default Details

class Details extends Component {

	componentDidMount() {
		this.props.fetchMovieDetail(this.props.id)
	}

	render() {
		const movieDetail = this.props.movieDetail.movieDetail.movieReqData
		const videoDetail = this.props.movieDetail.movieDetail.videoReqData

		if (!movieDetail.genres) {
			return <div />
		}
		const releaseDate = movieDetail.release_date + ' ' + movieDetail.production_countries[0].iso_3166_1
		const imageUrl = 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path

		//console.log(JSON.parse(movieDetail.genres))

		const genres = JSON.parse(movieDetail.genres).map(el => el.name).join(', ')
		const videoKey = videoDetail.results[0].key

		return (
			<div>
				<div className={styles.detailsWrapper}>
					<div className={styles.detailsImage}>
						<img src={imageUrl} alt={movieDetail.original_title} title={movieDetail.original_title} />
					</div>
					<div className={styles.content}>
						<article><h5>{movieDetail.original_title}</h5></article>
						<data>Release: {releaseDate}</data>
						<div>Tagline: {movieDetail.tagline}</div>
						<div>Budget: {movieDetail.budget}$</div>
						<div>Duration: {movieDetail.runtime}min.</div>
						<div>Genres: {genres}</div>
						<Button movieId={this.props.id} />
					</div>

				</div>
				<div className={styles.info}>
					<div>
						<div>Overview</div>
						<div>{movieDetail.overview}</div>
					</div>
				</div>
				<div className={styles.video}>
					<iframe allowFullScreen={true} src={'https://www.youtube.com/embed/' + videoKey}
						title='title'>
					</iframe>
				</div>
				<div className={styles.cast}>
					<CastContainer id={this.props.id} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { movieDetail: state.movieDetail }
}

export default connect(mapStateToProps, { fetchMovieDetail })(Details)