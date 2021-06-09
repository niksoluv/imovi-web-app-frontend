import axios from "axios"
import { makeUseAxios } from "axios-hooks"
import ScrollMenu from "react-horizontal-scrolling-menu";
import CastItem from "./CastItem";
import styles from './CastContainer.module.css'

const useAxios = makeUseAxios({
	axios: axios.create({ baseURL: '' })
})
const MenuItem = ({ text, selected }) => {
	return <div
		className={`menu-item ${selected ? 'active' : ''}`}
	>{text}</div>;
};
const CastContainer = (props) => {

	const [{ data: movieCast, loading: loading, error: error }] = useAxios(
		'https://api.themoviedb.org/3/movie/'
		+ props.id
		+ '/credits?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
	)
	if (loading) return 'Loading...'

	console.log(movieCast.cast)
	const cast = movieCast.cast.filter(el=>el.profile_path).map(el => {
		
		return (<CastItem imgSrc={'https://image.tmdb.org/t/p/w500' + el.profile_path}
			name={el.name}
			key={el.id} />)
})
	
	return (
		<div className={styles.scrollMenu}>
			<ScrollMenu data={cast} />
		</div>
	)
}

export default CastContainer