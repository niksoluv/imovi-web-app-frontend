import { Component } from "react";
import styles from './Footer.module.css'

class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<h5><strong>Imovi</strong></h5>
				<h7>Movie catalog web application based on React JS, Redux and .NET Web API</h7><br />
				<h7>Developed by students of group PZ-32</h7><br />
				<h6><strong>Vitaliy Hladkyi and Yaroslav Hura</strong></h6>
			</footer>
		)
	}
}

export default Footer