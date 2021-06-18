import React from 'react';
import styles from './CommentsContainer.module.css';
import CommentItem from './commentItem/CommentItem';
import ReactStars from 'react-rating-stars-component'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { getComments, addComment, getCurrentUserData } from '../../../storeAsyncActions/movies'

class CommentsBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentsItems: [],
			comment: {
				movieId: 0,
				text: '',
				rating: 5,
			},
		};

		this.changeComment = this.changeComment.bind(this);
		this.postComment = this.postComment.bind(this);
	}

	async componentDidMount() {
		this.setState({comment: {...this.state.comment, movieId: this.props.id}})
		this.props.getCurrentUserData()
		await this.props.getComments(this.props.id)
		this.setState({commentsItems: this.props.comments 
			? 
				this.props.comments
				.sort(function(a, b) {
					var dateA = new Date(a.date);
					var dateB = new Date(b.date)
					if (dateA > dateB) return -1;
					if (dateA < dateB) return 1;
					return 0;
				})
				.map(comment => {
					return (
						<CommentItem
							key={comment.id}
							author={comment.name}
							text={comment.text}
							date={comment.date}
							rating={comment.rating} />
					)
				})
			:
				[]})
		console.log('Comments: ' + this.state.comments)
	}

	async postComment(e) {
		e.preventDefault()
		let comment = this.state.comment;
		if (comment === undefined || comment === "") return;
		
		this.props.addComment( comment )
		await this.props.getComments( this.props.id )
		this.setState({commentsItems: this.props.comments 
			? 
				this.props.comments
				.sort(function(a, b) {
					var dateA = new Date(a.date);
					var dateB = new Date(b.date)
					if (dateA > dateB) return -1;
					if (dateA < dateB) return 1;
					return 0;
				})
				.map(comment => {
					return (
						<CommentItem
							key={comment.id}
							author={comment.name}
							text={comment.text}
							date={comment.date}
							rating={comment.rating} />
					)
				})
			:
				[]})
	}

	changeComment(e) {
		this.setState({
			comment:{
				...this.state.comment,
				text: e.target.value
			}
		})
	}

	render() {
		let addCommentBlock = this.props.userData.isAuthorised 
			?
				<div className={styles.control}>
				<div className={styles.rating}>
					<h5 className={styles.content}>Add your comment</h5>
					<br />
					<div className={styles.commentRatingLabel}>Movie rating
						<ReactStars
							count={10}
							value={this.state.comment['rating']}
							onChange={(newRating) => this.setState({
								comment:{
									...this.state.comment,
									rating: newRating
								}
							})}
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
				<button className={styles.btnSubmit} onClick={this.postComment}>
					Add comment
				</button>
			</div>
		: 
			<div className={styles.important}>	
				<NavLink to='/login'>
					<strong className={styles.underscored + ' ' + styles.important}>Login</strong>
				</NavLink>
				&nbsp;to add comments
			</div>


		return (
			<div className={styles.media}>
				<div className={styles.media_content}>
					<h3 className={styles.content}>Comments</h3>
					<div className={styles.field}>
						{addCommentBlock}
						<div>
							{
								this.state.commentsItems
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { 
		comments: state.movieDetail.comments,
		userData: state.userInfo
	}
}

export default connect(mapStateToProps, { getComments, addComment, getCurrentUserData}) (CommentsBlock);