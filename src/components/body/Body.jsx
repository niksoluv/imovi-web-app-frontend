import styles from './Body.module.css'
import MovieItem from './movieItem/MovieItem';
import useAxios from 'axios-hooks';
import { Component } from 'react';
import {getPopular} from '../../redux/actions/moviesActions'
import { connect } from 'react-redux';

class Body extends Component {
	componentDidMount() {
		this.props.getPopular(this.props.url)
	}
	render() {
		const { users } = this.props.users

		console.log(users)

		let movieArray = users.map(el => {
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
			</div>
		)
	}
}
const mapStateToProps  = (state) => ({users:state.users})

export default connect(mapStateToProps, {getPopular})(Body)