import { combineReducers } from 'redux'
import moviesReducer from './moviesReducers'
import moviesDetailReducer from './moviesDetailReducer'

export default combineReducers({
  moviesData: moviesReducer,
	movieDetail: moviesDetailReducer
})