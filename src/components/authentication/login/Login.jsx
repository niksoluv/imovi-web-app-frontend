import React from "react";
import styles from './Login.module.css'
import { connect } from 'react-redux';
import {usersAction} from '../../../redux/actions/usersAction'
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from "axios";

class LoginPage extends React.Component{
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
    if(this.props.user) {
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

    usersAction.formSubmittionStatus(true);
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.info('Valid Form')
      //usersAction.login(user)
      const response = await axios.get('https://localhost:44311/api/users/login', {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
        }}
      )
      console.log(response)
      const data = response.data
      if (response.status === 200){
        this.setState({redirect: "/movies"})
      }
      this.props.setCurrentUser({
        id: data['id'],
        name: data['name'],
        email: data['email'],
        password: data['password'],
        registrationDate: data['registrationDate'],
        birthDate: data['birthDate']
      })
      
    }
    else {
      console.log('Invalid Form')
    }
  }
	
  render() {
    const { username, email, password } = this.state.user;
    const { submitted } = this.state;
    
    if (this.state.redirect){
      return <Redirect to={this.state.redirect}/>
    }

    return (
      <div className={styles.form}>
        <h1 className={styles.content}>Login</h1>
        <div className={styles.form_input}>
          <label htmlFor="email" className={styles.content}>Email</label>
          <input type="email" value={this.state.email} name="email" onChange={(e) => { this.inputChange(e)} } className="form-control" id="email" placeholder="example@example.com" />
          { submitted && this.state.errors.user.email.length > 0 &&  <span className={styles.error}>{this.state.errors.user.email}</span>}
        </div>
        
        <div className={styles.form_input}>
          <label className={styles.content}>Password</label>
          <input type="password" value={this.state.password} name="password" onChange={(e) => { this.inputChange(e)} } className="form-control" placeholder="Password" />
              { submitted && this.state.errors.user.password.length > 0 &&  <span className={styles.error}>{this.state.errors.user.password}</span>}
        </div>
        
        <button type="button" className={styles.btn} onClick={this.submitForm}>Login</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
	  user: state.user
	}
}

export default connect(mapStateToProps, usersAction)(LoginPage);