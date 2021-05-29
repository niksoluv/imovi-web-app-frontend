//import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header'
import Body from './components/body/Body';
import { BrowserRouter, Route } from 'react-router-dom';
import Details from './components/details/Details';

function App() {
	return (

		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<div>
				<Route path='/movies' name={"1234567890"} component={Body} />
				<Route path='/details' component={Details} />
				</div>
				<footer className='footer'>footer</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
