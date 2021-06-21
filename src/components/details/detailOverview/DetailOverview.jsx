import { Component } from "react"
import styles from './DetailOverview.module.css'

class DetailOverview extends Component {
	render() {
		return (
			<div className={styles.info}>
				<div>
					<div>Overview</div>
					<div>{this.props.overview}</div>
				</div>
			</div>
		)
	}
}

export default DetailOverview