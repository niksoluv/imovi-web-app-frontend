import styles from './MovieItem.module.css'
import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieItem = (props) => {

	return (
		<div className={styles.movieElement}>
			<div className={styles.imageElement}>
				<img src={props.imageUrl} alt={props.originalTitle} title={props.originalTitle}/>
			</div>
			<div className={styles.contentElement}>
				<div>
					<NavLink to={{
						pathname: "/details",
						state: { id: props.id }
					}}
					> {props.originalTitle}</NavLink>
				</div>
			</div>
		</div>
	)

}

export default MovieItem