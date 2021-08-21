import MovieItem from './movieItem/MovieItem';
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies, removeMovies } from '../../storeAsyncActions/movies';
import { Row, Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

class Body extends Component {
	componentDidMount() {
		this.props.removeMovies()
		this.props.fetchMovies(this.props.url, this.props.keyword, 1)
	}

	render() {
		const { movies } = this.props.movies

		let movieArray = movies.map(el => {
			const imageUrl = el['poster_path'] ? 'https://image.tmdb.org/t/p/w500/' + el['poster_path'] :
				'https://image.shutterstock.com/image-vector/design-404-error-vector-concept-600w-393533854.jpg'
			return (
				<MovieItem key={el['id']}
					imageUrl={imageUrl}
					id={el['id']}
					originalTitle={el['original_title']} />
			)
		})

		return (
			<Container className='d-flex p-2' fluid={true} xl={10} lg={10} md={10} sm={10} xs={10} >
				<InfiniteScroll
					style={{ overflow: 'show' }}
					dataLength={movies.length} //This is important field to render the next data
					next={() => this.props.fetchMovies(this.props.url, this.props.keyword, this.props.movies.pageNumber)}
					hasMore={this.props.movies.hasMore}
					loader={<h4>Loading...</h4>}

					endMessage={
						<p style={{ textAlign: 'center', color: 'beige' }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
					scrollThreshold={0.9}>
					<Row className='d-flex justify-content-center'>
						{movieArray}
					</Row>
				</InfiniteScroll>
			</Container>)
	}
}
const mapStateToProps = (state) => {
	return { movies: state.movies }
}

export default connect(mapStateToProps, { fetchMovies, removeMovies })(Body)