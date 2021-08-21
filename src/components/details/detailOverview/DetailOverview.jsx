import { Component } from "react"
import { Card, Container } from "react-bootstrap"
import styles from './DetailOverview.module.css'

class DetailOverview extends Component {
	render() {
		return (

			<Card className="bg-dark mb-1 text-light">
				<Card.Body>
					<Card.Title>
						Overview
					</Card.Title>
					<Card.Subtitle className="">
						{this.props.overview}
					</Card.Subtitle>
				</Card.Body>
			</Card>
			// <div className={styles.info}>
			// 	<div>
			// 		<div>Overview</div>
			// 		<div>{this.props.overview}</div>
			// 	</div>
			// </div>
		)
	}
}

export default DetailOverview