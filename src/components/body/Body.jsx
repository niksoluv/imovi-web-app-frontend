import styles from './Body.module.css'
import React, { useEffect, useState } from 'react';
import MovieItem from './movieItem/MovieItem';
import useAxios from 'axios-hooks';

const Body = () => {
	const [{ data, loading, error }, refetch] = useAxios(
    'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
  )
	if (loading) return <p>Loading...</p>
	console.log(data.results)

	let movieArray = data.results.map(el => {
		const imageUrl = 'https://image.tmdb.org/t/p/w500/' + el['poster_path']
		return (
			<MovieItem key={el['id']}
				imageUrl={imageUrl}
				id={el['id']}
				originalTitle={el['original_title']} />
		)
	})
	return (
		<div className={styles.body}>
			{movieArray}
		</div>
	)
}
export default Body