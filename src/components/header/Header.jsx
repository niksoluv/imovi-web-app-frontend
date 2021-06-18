import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { getCurrentUserData, logout } from '../../storeAsyncActions/movies'

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

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
						<img src={process.env.PUBLIC_URL + '/ic_small.png'} alt='/ic_small.png' width="30" height="30"></img>
					</NavLink>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to={{
									pathname: "/movies"
								}}>Popular</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to={{
									pathname: "/toprated"
								}}>Top Rated</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to={{
									pathname: "/upcoming"
								}}>Upcoming</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to={{
									pathname: "/nowplaying"
								}}>Now Playing</NavLink>
							</li>
							<li>
								<input className="form-control mr-sm-2" type="search"
									placeholder="Search" aria-label="Search"
									value={this.state.value} onChange={this.handleChange} />
							</li>
							<li>
								<NavLink className="btn btn-outline-success my-2 my-sm-0"
									to={{
										pathname: '/search/' + this.state.value,
										state: { data: this.state.value }
									}}
								>Search</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to={
									this.props.userData.isAuthorised ?
										{ pathname: "/favourites" }
										:
										{ pathname: "/login" }
								}>Favourites</NavLink>
							</li>
						</ul>
						<div className="form-inline bg-dark my-2 my-lg-0 ">
							<ul className="navbar-nav mr-auto">
								{
									this.props.userData.isAuthorised ?
										<NavLink className="nav-link" to={{
											pathname: "/profile"
										}}>{this.props.userData.userInfo.name}</NavLink>
										:
										<div></div>
								}
								{
									this.props.userData.isAuthorised ?
										<NavLink className="nav-link" to={{
											pathname: "/login"
										}} onClick={() => {
											this.props.logout()
										}}>Logout</NavLink>
										:
										<NavLink className="nav-link" to={{
											pathname: "/login"
										}}>LogIn</NavLink>
								}
							</ul>
						</div>
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