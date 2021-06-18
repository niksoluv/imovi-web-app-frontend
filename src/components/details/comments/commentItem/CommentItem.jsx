import React from 'react';
import styles from './CommentItem.module.css';
import ReactStars from 'react-rating-stars-component';

const CommentItem = (props) => {
	const author = props.author
	const text = props.text
	const date = new Date(props.date)
	const dateFormatted = Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit"
	}).format(date)
	const rating = props.rating

	return (
		<div className={styles.media}>
			<div className={styles.media_content}>
				<div className={styles.content}>
					<p>
						<strong>{author}</strong>
						<br />
						{text}
					</p>
					<small>{dateFormatted}</small>
					<ReactStars
						count={10}
						value={rating}
						edit={false}
						size={24}
						activeColor="#ffd700"
					/>
				</div>
			</div>
		</div>
	);
}

export default CommentItem