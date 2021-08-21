import { Component } from "react"
import ReactStars from "react-stars"
import { connect } from "react-redux"
import Button from "../button/Button"
import styles from './DetailHeader.module.css'
import { Card, Col, Container, Image, Row } from "react-bootstrap"

class DetailHeader extends Component {
	render() {

		const { movieDetail } = this.props
		const releaseDate = movieDetail.release_date + ' ' +
			movieDetail?.production_countries[0]?.iso_3166_1
		const imageUrl = 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path

		const genres = JSON.parse(movieDetail.genres).map(el => el.name).join(', ')

		return (

			<Card className="bg-dark m-2">
				<Container className="mt-2 md-2">
					<Row >
						<Col md={4}  >
							<Image fluid={true} rounded={true} src={imageUrl} alt={movieDetail.original_title}
								title={movieDetail.original_title} />
						</Col>
						<Col className="bg-dark  bg-dark ">
							<div className="bg-dark text-white">
								<article><h5>{movieDetail.original_title}</h5></article>
								<data>Release: {releaseDate}</data>
								<span>Tagline: {movieDetail.tagline}</span>
								<span>Budget: {movieDetail.budget}$</span>
								<span>Duration: {movieDetail.runtime}min.</span>
								<span>Genres: {genres}</span>
								<span>Homepage:
									<a target="_blank" rel="noreferrer"
										href={movieDetail.homepage}> {movieDetail.original_title}</a>
								</span>
								<div>Rating:  {movieDetail.vote_average}
									<ReactStars
										count={10}
										value={movieDetail.vote_average}
										edit={false}
										isHalf={true}
										size={24}
										activeColor="#ffd700"
									/></div>
								<Button movieId={movieDetail.id} />
							</div>
						</Col>
					</Row>
				</Container>
			</Card>
			// <div className={styles.detailsWrapper}>
			// 	<div className={styles.detailsImage}>
			// 		<img src={imageUrl} alt={movieDetail.original_title} title={movieDetail.original_title} />
			// 	</div>
			// 	<div className={styles.content}>
			// 		<article><h5>{movieDetail.original_title}</h5></article>
			// 		<data>Release: {releaseDate}</data>
			// 		<span>Tagline: {movieDetail.tagline}</span>
			// 		<span>Budget: {movieDetail.budget}$</span>
			// 		<span>Duration: {movieDetail.runtime}min.</span>
			// 		<span>Genres: {genres}</span>
			// 		<span>Homepage:
			// 			<a target="_blank" rel="noreferrer"
			// 				href={movieDetail.homepage}> {movieDetail.original_title}</a>
			// 		</span>
			// 		<div>Rating:  {movieDetail.vote_average}
			// 			<ReactStars
			// 				count={10}
			// 				value={movieDetail.vote_average}
			// 				edit={false}
			// 				isHalf={true}
			// 				size={24}
			// 				activeColor="#ffd700"
			// 			/></div>
			// 		<Button movieId={movieDetail.id} />
			// 	</div>

			// </div>
		)
	}
}

const mapStateToProps = (state) => {
	return { movieDetail: state.movieDetail.movieDetail.movieReqData }
}

export default connect(mapStateToProps, {})(DetailHeader)