import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = (props) => {
	return (
		<div>
			<div className={styles.header}>
				<NavLink to={{
					pathname: "/movies"
				}}
				> <img src='/ic_small.png' alt='' />
				</NavLink>
			</div>
		</div>
	)
}

export default Header