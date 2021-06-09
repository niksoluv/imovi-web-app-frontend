import axios from "axios"
import { makeUseAxios } from "axios-hooks"

const useAxios = makeUseAxios({
	axios: axios.create({ baseURL: '' })
})

const CastContainer = (props) => {

	const [{ data: movieCast, loading: loading, error: error }] = useAxios(
		'https://api.themoviedb.org/3/movie/'
		+ props.id
		+ '/credits?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US'
	)
	if (loading) return 'Loading...'

	console.log(movieCast.cast)
	const cast = movieCast.cast.map(el=>{
		return <div>{el.original_name}</div>
	})

	return <div>{cast}</div>
}

export default CastContainer