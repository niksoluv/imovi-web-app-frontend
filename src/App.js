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

const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US&page=1'
const favouritesUrl = 'fav'

function App() {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<Container>
					<Route path='/movies' component={() => <Body url={popularUrl} />} />
					<Route path='/favourites' component={() => <Body url={favouritesUrl} />} />
					<Route path='/toprated' component={() => <Body url={topRatedUrl} />} />
					<Route path='/details' component={Details} />
					<Route path='/login' component={() => <LogIn />} />
					<Route path='/register' component={() => <Register />} />
				</Container>
				<footer className='footer'>footer</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
