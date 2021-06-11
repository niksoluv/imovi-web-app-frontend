import {GET_USERS, USERS_ERROR} from '../types'
import axios from 'axios'

export const getUsers = () => async dispatch => {
    try{
        const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=30c4ec1f7ead936d610a56b54bc4bbd4&language=en-US')
        
				dispatch( {
            type: GET_USERS,
            payload: res.data.results
        })
    }
    catch(e){
        dispatch( {
            type: USERS_ERROR,
            payload: console.log(e),
        })
    }

}