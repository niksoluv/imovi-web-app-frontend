import styles from './Details.module.css'
import { Component } from 'react';
import CastContainer from './cast/CastContainer';
import { connect } from 'react-redux';
import { fetchMovieDetail } from '../../storeAsyncActions/movies';
import Button from './button/Button';

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