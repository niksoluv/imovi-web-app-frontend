import './App.css';
import Header from './components/header/Header'
import Body from './components/body/Body';
import { BrowserRouter, Route } from 'react-router-dom';
import Details from './components/details/Details';
import { Container } from 'react-bootstrap';
import LogIn from './components/authentication/login/Login';
import Register from './components/authentication/register/Register';
import React from 'react';
import Profile from './components/body/profile/Profile';
import Footer from './components/footer/Footer';
import { connect } from 'react-redux';

const POPULAR = 'popular'
const TOP_RATED = 'top'
const FAVOURITES = 'fav'
const UPCOMING = 'upcoming'
const NOW_PLAYING = 'nowplaying'
const SEARCH = 'search'

class App extends React.Component {

	render() {
		console.log(this.props.data)
				

		return (
			<BrowserRouter>
				<div className='app-wrapper'>
					<Header />
					<Container>
						<Route path='/movies' component={() => <Body url={POPULAR} />} />
						<Route path='/toprated' component={() => <Body url={TOP_RATED} />} />
						<Route path='/upcoming' component={() => <Body url={UPCOMING} />} />
						<Route path='/nowplaying' component={() => <Body url={NOW_PLAYING} />} />
						<Route path='/search' component={(props) => {
							return <Body url={SEARCH} keyword={props.location.state.data} />
						}} />
						<Route path='/favourites' component={() => <Body url={FAVOURITES} />} />
						<Route path='/details' component={(props) => {
							return <Details id={props.location.state.movieId} />
						}} />
						<Route path='/login' component={() => <LogIn />} />
						<Route path='/register' component={() => <Register />} />
						<Route path='/profile' component={() => <Profile />} />
					</Container>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App

