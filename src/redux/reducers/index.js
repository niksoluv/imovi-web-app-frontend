import { combineReducers } from 'redux'
import userReducer from './moviesReducers'

export default combineReducers({
  users: userReducer
})