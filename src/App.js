//import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header'
import Body from './components/body/Body';
import { BrowserRouter, Route } from 'react-router-dom';
import Details from './components/details/Details';
import store from './redux/store'

function App() {
	return (

		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<div>
					<Route path='/movies' component={() => <Body store={store}/>} />
					<Route path='/details' component={Details} />
					{/* <Route path='/movies' render={() => <Body />} />
					<Route path='/details' render={() => <Details />} /> */}
				</div>
				<footer className='footer'>footer</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
