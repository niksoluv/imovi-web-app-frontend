import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = (props) => {
	return (
		<div>

			<nav class="navbar navbar-expand-lg navbar-light bg-light" height='45px'>
				<NavLink class="navbar-brand" to={{
					pathname: "/movies"
				}}>
					<img src={process.env.PUBLIC_URL + '/ic_small.png'} alt='/ic_small.png' width="30" height="30" alt=""></img>
				</NavLink>
				{/* <a class="navbar-brand" href="#">Navbar</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button> */}
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<NavLink class="nav-link" to={{
								pathname: "/login"
							}}>LogIn</NavLink>
						</li>
						<li class="nav-item">
							<NavLink class="nav-link" to={{
								pathname: "/register"
							}}>Register</NavLink>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Pricing</a>
						</li>
						<li class="nav-item">
							<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
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