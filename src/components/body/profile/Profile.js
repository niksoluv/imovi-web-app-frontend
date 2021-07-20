import Avatar from "boring-avatars";
import { Component } from "react";
import { connect } from "react-redux";
import styles from '../../details/detailHeader/DetailHeader.module.css'
import randomColor from "randomcolor"
import Button from "../../details/button/Button";

class Profile extends Component {
	componentDidMount() { }

	getRandomInt = (max) => {
		return Math.floor(Math.random() * max)
	}

	render() {
		const { userData } = this.props
		let num = this.getRandomInt(5)
		const registrationDate =
			new Date(Date.parse(userData.userInfo.registrationDate))
		let colors = []
		for (let i = 0; i < (num > 2 ? num : 3); ++i) {
			colors.push(randomColor())
		}

		const date = registrationDate.getDay() + '/' +
			registrationDate.getMonth() + '/' +
			registrationDate.getFullYear()
		const oneDay = 24 * 60 * 60 * 1000
		const days = Math.round((Date.now() - registrationDate)/oneDay)

		return (
			<div className={styles.detailsWrapper}>
				<div>
					<Avatar
						size={300}
						name={userData.userInfo.name}
						variant="beam"
						colors={colors}
					/>
				</div>
				<div className={styles.content}>
					<article><h5>{userData.userInfo.name}</h5></article>
					<data>registration date: {date} ({days} days)</data>
					{/* <Button /> */}
				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { userData: state.userInfo }
}

export default connect(mapStateToProps, {})(Profile)