import styles from './Body.module.css'
import React from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Details from '../details/Details';

class Body extends React.Component {

	constructor(props) {
		super(props);
		console.log(props.name)
	}

	state = {
		movies: []
	}

	componentDidMount() {
		fetch('https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US')
			.then((response) => response.json())
			.then(result => {
				this.setState({
					movies: result['results'].map(item => {
						return item
					})
				});
			});
	}

	render() {

		const movieArray = this.state.movies.map(el => {
			const imageUrl = 'https://image.tmdb.org/t/p/w500/' + el['poster_path']
			let path = 'details'
			return (
				<div className={styles.movieElement}>
					<div className={styles.imageElement}>
						<img src={imageUrl} />
					</div>
					<div className={styles.contentElement}>
						<div>
							<NavLink to={{
								pathname: "/details",
								aboutProps: {
									id: el['id']
								}
							}}
							> {el['original_title']}</NavLink>
						</div>
					</div>
				</div>
			)
		})
		return (
			<div className={styles.body}>
				{movieArray}
			</div>
		)
	}
}

export default Body