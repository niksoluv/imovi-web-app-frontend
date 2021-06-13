import styles from './Details.module.css'
import { Component } from 'react';
import CastContainer from './cast/CastContainer';
import { getDetailData } from '../../redux/actions/DetailsAction'
import { connect } from 'react-redux';
import { makeUseAxios } from 'axios-hooks';
import axios from 'axios';

const addMovieToFav = (props) => {
	//axios props.id
}

const ADD_TO_FAV = "Add to favourites"
const REMOVE_FROM_FAV = "Remove from favourites"

const useAxios = makeUseAxios({
	axios: axios.create({ baseURL: '' })
})

const Details = (props) => {
	const movieId = props.id

	const [{ data: movieData, loading: movieLoading, error: getError }] = useAxios(
		'https://api.themoviedb.org/3/movie/'
		+ movieId
		+ '?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
	)
	const [{ data: videoData, loading: videoLoading, error: getError2 }] = useAxios(
		'https://api.themoviedb.org/3/movie/'
		+ movieId
		+ '/videos?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
	)
	//check if movie in favourites
	const btnCaption = ADD_TO_FAV
	if (movieLoading || videoLoading) return 'Loading...'
	if (getError || getError2) return 'Error...'

	//console.log(movieData.production_countries[0].iso_3166_1)
	const releaseDate = movieData.release_date + ' ' + movieData.production_countries[0].iso_3166_1
	const imageUrl = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path
	const genres = movieData.genres.map(el => el.name).join(', ')
	const videoKey = videoData.results[0].key
	//console.log(movieData)
	return (
		<div>
			<div className={styles.detailsWrapper}>
				<div className={styles.detailsImage}>
					<img src={imageUrl} alt={movieData.original_title} title={movieData.original_title} />
				</div>
				<div className={styles.content}>
					<article><h5>{movieData.original_title}</h5></article>
					<data>Release: {releaseDate}</data>
					<div>Tagline: {movieData.tagline}</div>
					<div>Budget: {movieData.budget}$</div>
					<div>Duration: {movieData.runtime}min.</div>
					<div>Genres: {genres}</div>
					<button onClick={(movieId) => {
						addMovieToFav(props)
					}}>{btnCaption}</button>
				</div>

			</div>
			<div className={styles.info}>
				<div>
					<div>Overview</div>
					<div>{movieData.overview}</div>
				</div>
			</div>
			<div className={styles.video}>
				<iframe allowFullScreen={true} src={'https://www.youtube.com/embed/' + videoKey}
					title='title'>
				</iframe>
			</div>
			<div className={styles.cast}>
				<CastContainer id={movieId} />
			</div>
		</div>
	)
}
export default Details

// class Details extends Component {

// 	componentDidMount() {
// 		this.props.getDetailData(this.props.id)
// 	}

// 	render() {

// 		const { movieData } = this.props

// 		//const { videoData } = this.props.videoData
// 		//console.log(videoData)
// 		console.log(movieData)
// 		const releaseDate = movieData.release_date + movieData.production_countries[0].iso_3166_1//+ ' ' + movieData.production_countries[0].iso_3166_1
// 		// const imageUrl = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path

// 		//const genres = movieData.genres.map(el => el.name).join(', ')
// 		//const videoKey = videoData.key
// 		return (
// 			<div>
// 				{/* <div className={styles.detailsWrapper}>
// 					<div className={styles.detailsImage}>
// 						<img src={imageUrl} alt={movieData.original_title} title={movieData.original_title} />
// 					</div>
// 					<div className={styles.content}>
// 						<article><h5>{movieData.original_title}</h5></article>
// 						<data>Release: {releaseDate}</data>
// 						<div>Tagline: {movieData.tagline}</div>
// 						<div>Budget: {movieData.budget}$</div>
// 						<div>Duration: {movieData.runtime}min.</div>
// 						<div>Genres: {genres}</div>
// 						<button>Favourite</button>
// 					</div>

// 				</div>
// 				<div className={styles.info}>
// 					<div>
// 						<div>Overview</div>
// 						<div>{movieData.overview}</div>
// 					</div>
// 				</div>
// 				<div className={styles.video}>
// 					<iframe allowFullScreen={true} src={'https://www.youtube.com/embed/' + videoKey}
// 						title='title'>
// 					</iframe>
// 				</div>
// 				<div className={styles.cast}>
// 					<CastContainer id={movieData.id} />
// 				</div> */}
// 				{'releaseDate'}
// 			</div>
// 		)
// 	}
// }
// const mapStateToProps = (state) => {
// 	//debugger
// 	const {movieData} = state.movieDetail

// 	return {movieData}
// 	// return {
// 	// 	movieDetailData: state.movieDetail
// 	// 	//videoData: state.movieDetail.videoData
// 	// }
// }

// export default connect(mapStateToProps, { getDetailData })(Details)

