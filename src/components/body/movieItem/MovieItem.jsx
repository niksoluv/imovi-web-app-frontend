import styles from './MovieItem.module.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const MovieItem = (props) => {

	return (
		<Col xs={2.5}>
			<div className={styles.movieElement}>
				<div className={styles.imageElement}>
					<img src={props.imageUrl} alt={props.originalTitle} title={props.originalTitle} />
				</div>
				<div className={styles.contentElement}>
					<div>
						<NavLink to={{
							pathname: "/details",
							state: { movieId: props.id }
						}}
						> {props.originalTitle}</NavLink>
					</div>
				</div>
			</div>
		</Col>
	)

}

export default MovieItem