//import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header'
import Body from './components/body/Body';
import { BrowserRouter, Route } from 'react-router-dom';
import Details from './components/details/Details';
import { Container } from 'react-bootstrap';
import LogIn from './components/authentication/login/Login';
import Register from './components/authentication/register/Register';
import Users from './users'
import React from 'react';


const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US&page=1'
const favouritesUrl = 'fav'

class App extends React.Component{ 
	constructor(props){
		super(props)
		this.state = {
			id: 0,
			username: '',
			email: '',
			password: '',
			registrationDate: '',
			birthDate: ''
		}
		this.setCurrentUser = this.setCurrentUser.bind(this)
	}

	setCurrentUser(user){
		this.setState(user)
	}

	render(){
		return (
			<BrowserRouter>
				<div className='app-wrapper'>
					<Header />
					<Container>
						<Route path='/movies' component={() => <Body url={popularUrl} />} />
						<Route path='/favourites' component={() => <Body url={favouritesUrl} currentUser={this.state}/>} />
						<Route path='/toprated' component={() => <Body url={topRatedUrl} />} />
						<Route path='/details' component={(props) => {
							return<Details id={props.location.state.movieId}/>}} />
						<Route path='/login' component={() => <LogIn setCurrentUser={this.setCurrentUser}/>} />
						<Route path='/register' component={() => <Register setCurrentUser={this.setCurrentUser}/>} />
					</Container>
					<footer className='footer'>footer</footer>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
