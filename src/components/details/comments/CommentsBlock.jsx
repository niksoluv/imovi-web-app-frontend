import React from 'react';
import styles from './CommentsBlock.module.css';
import ReactStars from "react-rating-stars-component";
import CommentItem from './CommentItem';

class CommentsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            commentsDataArray: [
                {
                    author: 'Comment author 1',
                    text: 'Text of comment 1',
                    date: Date.now,
                    rating: 4
                },
                {
                    author: 'Comment author 2',
                    text: 'Another text of comment 2',
                    date: Date.now,
                    rating: 1
                }
            ],
            commentsItems: [],
            comment: "",
            rating: 3};
        
        this.changeComment = this.changeComment.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        let arr = this.state.commentsDataArray
            .map(comment => {
                return(
                    <CommentItem 
                        author={comment['author']}
                        text={comment['text']}
                        date={comment['date']}
                        rating={comment['rating']}/>
                )}
            )
        this.setState({commentsItems: arr})
        console.log('Comments: ' + this.state.commentsDataArray)
    }

    addComment(e) {
        e.preventDefault()
        let comment = this.state.comment;
        if (comment === undefined || comment === "") return;
    }

    changeComment(e) {
        this.setState({ comment: e.target.value });
    }

    render(){
        return(
            <div className={styles.media}>
                <div className={styles.media_content}>
                    <h3 className={styles.content}>Comments</h3>
                    <div className={styles.field}>
                        <div className={styles.control}>
                            
                            <div className={styles.rating}>
                                <h5 className={styles.content}>Add your comment</h5>
                                <br/>
                                <div className={styles.commentRatingLabel}>Movie rating
                                    <ReactStars
                                        count={5}
                                        value={this.state.rating}
                                        onChange={(newRating)=> this.setState({rating: newRating})}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                            <textarea
                                className={styles.textarea}
                                placeholder="Add a comment..."
                                onChange={this.changeComment}
                            />
                            <button className={styles.btnSubmit} onClick={this.addComment}>
                                Add comment
                            </button>
                        </div>
                        
                        <div>
                            {this.state.commentsItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsBlock;