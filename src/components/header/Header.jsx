import { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { getCurrentUserData, logout } from '../../storeAsyncActions/movies'
// class Header extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<nav className="navbar navbar-expand navbar-dark bg-dark" height='45px'>
// 					<NavLink className="navbar-brand" to={{
// 						pathname: "/movies"
// 					}}>
// 						<img src={process.env.PUBLIC_URL + '/ic_small.png'} alt='/ic_small.png' width="30" height="30" alt=""></img>
// 					</NavLink>
// 					<div className="collapse navbar-collapse" id="navbarNav">
// 						<ul className="navbar-nav">
// 							<li className="nav-item">
// 								<NavLink className="nav-link" to={{
// 									pathname: "/movies"
// 								}}>Popular</NavLink>
// 							</li>
// 							<li className="nav-item">
// 								<NavLink className="nav-link" to={{
// 									pathname: "/favourites"
// 								}}>Favourites</NavLink>
// 							</li>
// 							<li className="nav-item">
// 								<a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
// 							</li>
// 							<li className="nav-item">
// 								<NavLink className="nav-link" to={{
// 									pathname: "/login"
// 								}}>LogIn</NavLink>
// 							</li>
// 							{/* <li className="nav-item">
// 								<NavLink className="nav-link" to={{
// 									pathname: "/register"
// 								}}>Register</NavLink>
// 							</li> */}
// 						</ul>
// 					</div>
// 				</nav>
// 			</div>
// 		)
// 	}
// }

// export default Header

class Header extends Component {
	componentDidMount() {
		this.props.getCurrentUserData()
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark" height='45px'>
					<NavLink className="navbar-brand" to={{
						pathname: "/movies"
					}}>
						<img src={process.env.PUBLIC_URL + '/ic_small.png'} alt='/ic_small.png' width="30" height="30" alt=""></img>
					</NavLink>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink className="nav-link" to={{
									pathname: "/movies"
								}}>Popular</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to={{
									pathname: "/favourites"
								}}>Favourites</NavLink>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
							</li>
							{
								this.props.userData.isAuthorised ?
									<div className="nav-item">
										<li className="nav-item">
											<NavLink className="nav-link" to={{
												pathname: "/profile"
											}}>{this.props.userData.userInfo.name}</NavLink>
										</li>
										<li className="nav-item">
											<NavLink className="nav-link" to={{
												pathname: "/login"
											}} onClick={() => {
												this.props.logout()
											}}>Logout</NavLink>
										</li>
									</div>
									:
									<li className="nav-item">
										<NavLink className="nav-link" to={{
											pathname: "/login"
										}}>LogIn</NavLink>
									</li>
							}
							{/* <li className="nav-item">
								<NavLink className="nav-link" to={{
									pathname: "/register"
								}}>Register</NavLink>
							</li> */}
						</ul>
					</div>
				</nav>
			</div >
		)
	}
}

const mapStateToProps = (state) => {
	return { userData: state.userInfo }
}

export default connect(mapStateToProps, { getCurrentUserData, logout })(Header)