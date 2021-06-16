import React from 'react';
import styles from './CommentItem.module.css';
import ReactStars from 'react-rating-stars-component';

const CommentItem = (props) => {
    const author = props.author
    const text = props.text
    const date = props.date
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
              <small>{date}</small>
              <ReactStars
                count={5}
                value={rating}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>
        </div>
      );
}

export default CommentItem