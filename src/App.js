//import logo from './logo.svg';
import styles from './App.css';
import Header from './components/header/Header'
import Body from './components/body/Body';
import { BrowserRouter, Route } from 'react-router-dom';
import Details from './components/details/Details';
import { Container } from 'react-bootstrap';
import LogIn from './components/authentication/login/Login';
import Register from './components/authentication/register/Register';
import React from 'react';
import Profile from './components/body/profile/Profile';


const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US&page=1'
const favouritesUrl = 'fav'

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<BrowserRouter>
				<div className={styles.app_wrapper}>
					<Header />
					<Container className={styles.maincontainer}>
						<Route path='/movies' component={() => <Body url={popularUrl} />} />
						<Route path='/favourites' component={() => <Body url={favouritesUrl} />} />
						<Route path='/toprated' component={() => <Body url={topRatedUrl} />} />
						<Route path='/details' component={(props) => {
							return <Details id={props.location.state.movieId} />
						}} />
						<Route path='/login' component={() => <LogIn />} />
						<Route path='/register' component={() => <Register />} />
						<Route path='/profile' component={() => <Profile />} />
					</Container>
				</div>
				<footer className={styles.footer}>
					<h5><strong>Imovi</strong></h5>
					<h7>Movie catalog web application based on React JS, Redux and .NET Web API</h7><br/>
					<h7>Developed by students of group PZ-32</h7><br/>
					<h6><strong>Vitaliy Hladkyi and Yaroslav Hura</strong></h6>
				</footer>
			</BrowserRouter>
			
		);
	}
}

export default App;
