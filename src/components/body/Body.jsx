import styles from './Body.module.css'
import MovieItem from './movieItem/MovieItem';
import useAxios from 'axios-hooks';

const Body = (props) => {
	const [{ data, loading, error },] = useAxios(
    props.requestUrl
  )
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error...</p>
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