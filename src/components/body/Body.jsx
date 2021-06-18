import styles from './Body.module.css'
import MovieItem from './movieItem/MovieItem';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../storeAsyncActions/movies';
import { Row, Container } from 'react-bootstrap';

class Body extends Component {
	componentDidMount() {
		//location.reload();
		this.props.fetchMovies(this.props.url, this.props.keyword)
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
			<Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10}>
				<Row>
					{movieArray}
				</Row>
			</Container>)
	}
}
const mapStateToProps = (state) => {
	return { movies: state.movies }
}

export default connect(mapStateToProps, { fetchMovies })(Body)