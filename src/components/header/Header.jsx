import styles from './Header.module.css'

const Header = (props) =>{
	return(
		<div>
			<div className={styles.header}>
				<img src='../ic_small.png'/>
			</div>	
		</div>
	)
}

export default Header