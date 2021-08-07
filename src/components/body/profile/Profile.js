import Avatar from "boring-avatars";
import { Component } from "react";
import { connect } from "react-redux";
import styles from '../../details/detailHeader/DetailHeader.module.css'
import {getCurrentUserData}from '../../../storeAsyncActions/movies'

class Profile extends Component {
	componentDidMount() {
		this.props.getCurrentUserData()
	}

	getRandomInt = (max) => {
		return Math.floor(Math.random() * max)
	}

	render() {
		const { userData } = this.props
		const registrationDate =
			new Date(Date.parse(userData.userInfo.registrationDate))


		const date = registrationDate.getFullYear() + '-' +
			registrationDate.getMonth() + '-' +
			registrationDate.getDay()
		const oneDay = 24 * 60 * 60 * 1000
		const days = Math.round((Date.now() - registrationDate) / oneDay)
		console.log(userData)
		return (
			<div className={styles.detailsWrapper}>
				<div>
					<Avatar
						size={300}
						name={userData.userInfo.name}
						variant="beam"
						colors={userData.userInfo.profileColors}
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

export default connect(mapStateToProps, { getCurrentUserData })(Profile)