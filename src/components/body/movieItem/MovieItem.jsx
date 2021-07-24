import styles from './MovieItem.module.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const MovieItem = (props) => {

	return (
		<Col xs={2.5}>
			<div className={styles.movieElement}>
				<div className={styles.imageElement}>
					<NavLink to={{
						pathname: "/details",
						state: { movieId: props.id },
						query: { movieId: props.id }
					}}
						onClick={() => {
							localStorage.setItem('movieId', props.id)
						}}>
						<img src={props.imageUrl} alt={props.originalTitle}
							title={props.originalTitle} />
					</NavLink>

				</div>
				<div className={styles.contentElement}>
					<div>
						<NavLink to={{
							pathname: "/details",
							state: { movieId: props.id },
							query: { movieId: props.id }
						}}
							onClick={() => {
								localStorage.setItem('movieId', props.id)
							}}>
							{props.originalTitle}</NavLink>
					</div>
				</div>
			</div>
		</Col>
	)

}

export default MovieItem