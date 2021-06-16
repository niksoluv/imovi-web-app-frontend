import React from "react";
import styles from './Login.module.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from "../../../storeAsyncActions/movies"
import { NavLink } from 'react-router-dom'

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				email: '',
				password: ''
			},
			errors: {
				user: {
					email: 'Email is not valid!',
					password: 'Enter password'
				}
			},
			redirect: null,
			submitted: false
		}
	}

	componentDidMount() {
		if (this.props.user) {
			this.setState({ user: this.props.user });
			if (this.props.user.email) {
				this.resetErrorMsg();
			}
		}
	}

	validateForm = (errors) => {
		let valid = true;
		Object.entries(errors.user).forEach(item => {
			console.log(item)
			item && item[1].length > 0 && (valid = false)
		})
		return valid;
	}

	isValidEmail(value) {
		return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value))
	}

	validationErrorMessage = (event) => {
		const { name, value } = event.target;
		let errors = this.state.errors;

		switch (name) {
			case 'email':
				errors.user.email = this.isValidEmail(value) ? '' : 'Email is not valid!';
				break;
			case 'password':
				errors.user.password = value.length > 3 ? '' : 'Enter a password of at least 4 characters!';
				break;
			default:
				break;
		}
	}

	resetErrorMsg = () => {
		let errors = this.state.errors;
		errors.user.email = ''
		errors.user.password = ''
		this.setState({ errors });
	}

	inputChange = async (event) => {
		const user = this.state.user;
		const { name, value } = event.target;

		user[name] = value;

		this.setState({ user });
		this.validationErrorMessage(event);
	}

	submitForm = async (event) => {

		this.setState({ submitted: true });
		const user = this.state.user;

		event.preventDefault();
		if (this.validateForm(this.state.errors)) {
			this.props.login(user)
		}
		else {
			console.log('Invalid Form')
		}
		console.log(this.props)
	}

	render() {
		const { submitted } = this.state;

		if (this.props.userData.isAuthorised) {
			return <Redirect to='/movies' />
		}

		return (
			<div>
				<div className={styles.form}>
					<h1 className={styles.content}>Login</h1>
					<div className={styles.form_input}>
						<label htmlFor="email" className={styles.content}>Email</label>
						<input type="email" value={this.state.email} name="email" onChange={(e) => { this.inputChange(e) }} className="form-control" id="email" placeholder="example@example.com" />
						{submitted && this.state.errors.user.email.length > 0 && <span className={styles.error}>{this.state.errors.user.email}</span>}
					</div>

					<div className={styles.form_input}>
						<label className={styles.content}>Password</label>
						<input type="password" value={this.state.password} name="password" onChange={(e) => { this.inputChange(e) }} className="form-control" placeholder="Password" />
						{submitted && this.state.errors.user.password.length > 0 && <span className={styles.error}>{this.state.errors.user.password}</span>}
					</div>

					<button type="button" className={styles.btn} onClick={this.submitForm}>Login</button>

					<NavLink className="nav-link"
						to="/register">Haven't account yet?</NavLink>

				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { userData: state.userInfo }
}

export default connect(mapStateToProps, { login })(LoginPage)