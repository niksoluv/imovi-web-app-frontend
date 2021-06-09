import styles from './Details.module.css'
import React from 'react';
import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import CastContainer from './cast/CastContainer';

const useAxios = makeUseAxios({
	axios: axios.create({ baseURL: '' })
})

const Details = (props) => {
	const movieId = props.location.state.id

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

	if (movieLoading || videoLoading) return 'Loading...'
	if (getError || getError2) return 'Error...'

	console.log(movieData.production_countries[0].iso_3166_1)
	const releaseDate = movieData.release_date + ' ' + movieData.production_countries[0].iso_3166_1
	const imageUrl = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path
	const genres = movieData.genres.map(el => el.name).join(', ')
	const videoKey = videoData.results[0].key
	return (
		<div>
			<div className={styles.detailsWrapper}>
				<div className={styles.detailsImage}>
					<img src={imageUrl} alt={movieData.original_title} title={movieData.original_title} />
				</div>
				<div className={styles.content}>
					<div>{movieData.original_title}</div>
					<div>{releaseDate}</div>
					<div>{movieData.tagline}</div>
					<div>Budget: {movieData.budget}$</div>
					<div>Duration: {movieData.runtime}min.</div>
					<div>Genres: {genres}</div>
					<button>Favourite</button>
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