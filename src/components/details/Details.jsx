import styles from './Details.module.css'

const Details = (props) =>{
	console.log("DETAILS")
	console.log(props.location.aboutProps)
	return(
		<div>
			 {props.location.aboutProps['id']}
		</div>
	)
}

export default Details