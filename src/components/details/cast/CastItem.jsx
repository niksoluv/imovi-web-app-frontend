import { Card } from "react-bootstrap"
import styles from './CastItem.module.css'


const CastItem = (props) => {
	return (
		<div className={styles.card}>
			<img className="card-img-top" width='50px' src={props.imgSrc} alt={props.name} />
			<div className="card-body"><p className="card-text"></p>
				<a href="#" className="">{props.name}</a>
			</div>
		</div>
	)
}

export default CastItem