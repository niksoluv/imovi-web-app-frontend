import React from "react";
import styles from './Register.module.css'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { register } from '../../../storeAsyncActions/movies'

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: '',
				email: '',
				password: ''
			},
			errors: {
				user: {
					name: 'Enter username',
					password: 'Enter password',
					email: 'Email is not valid!'
				}
			},
			redirect: null,
			submitted: false
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
			case 'name':
				errors.user.name = value.length < 1 ? 'Enter username' : '';
				break;
			case 'email':
				errors.user.email = this.isValidEmail(value) ? '' : 'Email is not valid!';
				break;
			case 'password':
				errors.user.password = value.length > 3 ? '' : 'Enter a password of at least 4 characters!';
				break;
			default:
				break;
		}

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
			debugger
			this.props.register(user)
		}
		else {
			console.log('Invalid Form')
		}
	}

	render() {
		const { submitted } = this.state;
		debugger
		if (this.props.userData.isAuthorised) {
			return <Redirect to='/movies' />
		}
		return (
			<div className={styles.form}>
				<h1 className={styles.content}>Registration</h1>

				<div className={styles.form_input}>
					<label htmlFor="email" className={styles.content}>Email</label>
					<input type="email" value={this.state.email} name="email" onChange={(e) => { this.inputChange(e) }} className="form-control" id="email" placeholder="example@example.com" />
					{submitted && this.state.errors.user.email.length > 0 && <span className={styles.error}>{this.state.errors.user.email}</span>}
				</div>

				<div className={styles.form_input}>
					<label className={styles.content}>Username</label>
					<input type="text" value={this.state.name} name="name" onChange={(e) => this.inputChange(e)} className="form-control" placeholder="Your username" />
					{submitted && this.state.errors.user.name.length > 0 && <span className={styles.error}>{this.state.errors.user.name}</span>}
				</div>

				<div className={styles.form_input}>
					<label className={styles.content}>Password</label>
					<input type="password" value={this.state.password} name="password" onChange={(e) => { this.inputChange(e) }} className="form-control" placeholder="Password" />
					{submitted && this.state.errors.user.password.length > 0 && <span className={styles.error}>{this.state.errors.user.password}</span>}
				</div>

				<button type="button" className={styles.btn} onClick={this.submitForm}>Register</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userData: state.userInfo
	}
}

export default connect(mapStateToProps, { register })(RegisterPage);