import ScrollMenu from "react-horizontal-scrolling-menu";
import CastItem from "./CastItem";
import styles from './CastContainer.module.css'
import { Component } from "react";
import { connect } from "react-redux";
import { getCast } from '../../../storeAsyncActions/movies'

// const useAxios = makeUseAxios({
// 	axios: axios.create({ baseURL: '' })
// })

// const CastContainer = (props) => {

// 	const [{ data: movieCast, loading: loading, error: error }] = useAxios(
// 		'https://api.themoviedb.org/3/movie/'
// 		+ props.id
// 		+ '/credits?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
// 	)
// 	if (loading) return 'Loading...'

// 	//console.log(movieCast.cast)
// 	const cast = movieCast.cast.filter(el=>el.profile_path).map(el => {

// 		return (<CastItem imgSrc={'https://image.tmdb.org/t/p/w500' + el.profile_path}
// 			name={el.name}
// 			key={el.id} />)
// })

// 	return (
// 		<div className={styles.scrollMenu}>
// 			<ScrollMenu data={cast} />
// 		</div>
// 	)
// }

// export default CastContainer

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
			<div className={styles.scrollMenu}>
				<ScrollMenu alignCenter={false} data={cast} />
			</div>
		)
	}


}

const mapStateToProps = (state) => {
	return { castData: state.movieDetail.castData }
}

export default connect(mapStateToProps, { getCast })(CastContainer)