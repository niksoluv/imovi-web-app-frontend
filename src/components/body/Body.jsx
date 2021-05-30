import styles from './Body.module.css'
import React from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Details from '../details/Details';
import MovieItem from './movieItem/MovieItem';

class Body extends React.Component {

	constructor(props) {
		super(props);
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
				<MovieItem key={el['id']}
				imageUrl={imageUrl} 
				id={el['id']} 
				originalTitle={el['original_title']}/>
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