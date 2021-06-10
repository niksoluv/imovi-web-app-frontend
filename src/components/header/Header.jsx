import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = (props) => {
	return (
		<div>

			<nav className="navbar navbar-expand-lg navbar-dark bg-dark" height='45px'>
				<NavLink className="navbar-brand" to={{
					pathname: "/movies"
				}}>
					<img src={process.env.PUBLIC_URL + '/ic_small.png'} alt='/ic_small.png' width="30" height="30" alt=""></img>
				</NavLink>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to={{
								pathname: "/login"
							}}>LogIn</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={{
								pathname: "/register"
							}}>Register</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={{
								pathname: "/favourites"
							}}>Favourites</NavLink>
						</li>
						<li className="nav-item">
							<a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
						</li>
					</ul>
				</div>
			</nav>

			{/* <div className={styles.header}>
				<NavLink to={{
					pathname: "/movies"
				}}
				> <img src={process.env.PUBLIC_URL + '/ic_small.png'} alt='/ic_small.png' />
				</NavLink>
			</div> */}
		</div>
	)
}

export default Header