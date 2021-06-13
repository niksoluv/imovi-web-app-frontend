import { combineReducers } from 'redux'
import moviesReducer from './moviesReducers'
import moviesDetailReducer from './moviesDetailReducer'
import usersReducer from './usersReducer'

export default combineReducers({
  moviesData: moviesReducer,
	movieDetail: moviesDetailReducer,
  users: usersReducer
})