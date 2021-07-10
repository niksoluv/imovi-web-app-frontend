import { Component } from 'react'
import { connect } from 'react-redux';
import { addMovieToFav, isMovieInFavourites } from '../../../storeAsyncActions/movies'
import { NavLink } from 'react-router-dom'


class Button extends Component {

	componentDidMount() {
		this.props.isMovieInFavourites(this.props.movieId)
	}

	render() {
		const btnCaption = this.props.btnCaption
		return (
			<div>
				{this.props.userData.isAuthorised ?
					<button className="btn btn-sm btn-light btn-outline-secondary" type="button" onClick={() => {
						this.props.addMovieToFav(this.props.movieId)
					}}>{btnCaption}</button>
					:
					<NavLink to={{ pathname: "/login" }} className="btn btn-sm btn-light btn-outline-secondary" type="button" onClick={() => {
						this.props.addMovieToFav(this.props.movieId)
					}}>{btnCaption}</NavLink>
				}
			</div >
		)
	}
}

const mapStateToProps = (state) => {
	return { btnCaption: state.movieDetail.btnCaption, userData: state.userInfo }
}

export default connect(mapStateToProps, { isMovieInFavourites, addMovieToFav })(Button)