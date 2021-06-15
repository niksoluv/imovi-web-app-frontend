import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { movieDetailReducer } from "./detailReducer"
import { moviesReducer } from "./moviesReducer"
import { authReducer } from "./authReducer"

const rootReducer = combineReducers({
	movies: moviesReducer,
	movieDetail: movieDetailReducer,
	userInfo: authReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))