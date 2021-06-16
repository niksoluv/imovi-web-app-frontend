import styles from './Body.module.css'
import MovieItem from './movieItem/MovieItem';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../storeAsyncActions/movies';

class Body extends Component {
	componentDidMount() {
		this.props.fetchMovies(this.props.url)
	}
	render() {
		const { movies } = this.props.movies

		let movieArray = movies.map(el => {
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
			</div>)
	}
}
const mapStateToProps = (state) => {
	return { movies: state.movies }
}

export default connect(mapStateToProps, { fetchMovies })(Body)