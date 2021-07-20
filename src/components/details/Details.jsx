import { Component } from 'react';
import CastContainer from './cast/CastContainer';
import { connect } from 'react-redux';
import { fetchMovieDetail, isMovieInFavourites } from '../../storeAsyncActions/movies';
import CommentsContainer from './comments/CommentsContainer'
import DetailHeader from './detailHeader/DetailHeader';
import DetailOverview from './detailOverview/DetailOverview';
import VideoBlock from './videoBlock/VideoBlock';

class Details extends Component {

	componentDidMount() {
		this.props.fetchMovieDetail(this.props.id)
		this.props.isMovieInFavourites(this.props.id)
		window.scrollTo(0, 0)
	}

	render() {
		const movieDetail = this.props.movieDetail.movieDetail.movieReqData
		const videoDetail = this.props.movieDetail.movieDetail.videoReqData
		if (!movieDetail.genres) {
			return <div />
		}
		const videoKey = videoDetail.results[0]?.key
		return (
			<div>
				<DetailHeader movieDetail={movieDetail} />
				<DetailOverview overview={movieDetail.overview} />
				<VideoBlock videoKey={videoKey} />
				<CastContainer id={this.props.id} />
				<CommentsContainer id={this.props.id} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	
	return { movieDetail: state.movieDetail }
}

export default connect(mapStateToProps, { fetchMovieDetail, isMovieInFavourites })(Details)