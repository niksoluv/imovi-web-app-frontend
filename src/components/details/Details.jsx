import styles from './Details.module.css'
import React from 'react';
import useAxios from 'axios-hooks';

const Details = (props) => {
	const movieId = props.location.state.id
	const [{ data, loading, error }, refetch] = useAxios(
		'https://api.themoviedb.org/3/movie/'
		+ movieId
		+ '?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
	)
	if (loading) return <p>Loading...</p>
	console.log(data)
	const releaseDate = data.release_date + ' ' + data.production_countries[0].iso_3166_1
	const imageUrl = 'https://image.tmdb.org/t/p/w500' + data.poster_path
	const genres = data.genres.map(el=>el.name).join(', ')
	
	return (
		<div className={styles.detailsWrapper}>
			<div className={styles.detailsImage}>
				<img src={imageUrl} alt={data.original_title} title={data.original_title} />
			</div>
			<div className={styles.content}>
				<div>{data.original_title}</div>
				<div>{releaseDate}</div>
				<div>{data.tagline}</div>
				<div>Budget: {data.budget}$</div>
				<div>Duration: {data.runtime}min.</div>
				<div>Genres: {genres}</div>
			</div>
			<div className={styles.info}>
				<div>
					<div>Overview</div>
					<div>{data.overview}</div>
				</div>
			</div>
		</div>
	)
}

export default Details