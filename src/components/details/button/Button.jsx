import { Component } from 'react'
import { connect } from 'react-redux';
import { addMovieToFav, isMovieInFavourites } from '../../../storeAsyncActions/movies';


class Button extends Component {

	componentDidMount() {
		this.props.isMovieInFavourites(this.props.movieId)
	}

	render() {
		const btnCaption = this.props.btnCaption
		return (
			<div>
				<button onClick={() => {
					this.props.addMovieToFav(this.props.movieId)
				}}>{btnCaption}</button>
			</div >
		)
	}
}

const mapStateToProps = (state) => {
	return { btnCaption: state.movieDetail.btnCaption }
}

export default connect(mapStateToProps, { isMovieInFavourites, addMovieToFav })(Button)