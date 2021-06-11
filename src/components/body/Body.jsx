import styles from './Body.module.css'
import MovieItem from './movieItem/MovieItem';
import useAxios from 'axios-hooks';
import { Component } from 'react';
import {getUsers} from '../../redux/actions/usersActions'
import { connect } from 'react-redux';
// const Body = () => {
// 	//console.log(props.store.getState())


// 	const [{ data, loading, error },] = useAxios(
// 		'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
// 	)
// 	if (loading) return <p>Loading...</p>
// 	if (error) return <p>Error...</p>

// 	let movieArray = data.results.map(el => {
// 		const imageUrl = 'https://image.tmdb.org/t/p/w500/' + el['poster_path']
// 		return (
// 			<MovieItem key={el['id']}
// 				imageUrl={imageUrl}
// 				id={el['id']}
// 				originalTitle={el['original_title']} />
// 		)
// 	})
// 	return (
// 		<div className={styles.body}>

// 			{movieArray}
// 		</div>
// 	)
// }
// export default Body

class Body extends Component {
	componentDidMount() {
		this.props.getUsers()
	}
	render() {
		const { users } = this.props.users
		
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

export default connect(mapStateToProps, {getUsers})(Body)