import ScrollMenu from "react-horizontal-scrolling-menu";
import CastItem from "./CastItem";
import styles from './CastContainer.module.css'
import { Component } from "react";
import { connect } from "react-redux";
import { getCast } from '../../../storeAsyncActions/movies'

class CastContainer extends Component {

	componentDidMount() {
		this.props.getCast(this.props.id)
	}

	render() {
		if (!this.props.castData) {
			return <div />
		}

		const cast = this.props.castData.filter(el => el.profile_path).map(el => {

			return (<CastItem imgSrc={'https://image.tmdb.org/t/p/w500' + el.profile_path}
				name={el.name}
				key={el.id} />)
		})

		return (
			<div className={styles.cast}>
				<div className={styles.scrollMenu}>
					<ScrollMenu alignCenter={false} data={cast} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { castData: state.movieDetail.castData }
}

export default connect(mapStateToProps, { getCast })(CastContainer)