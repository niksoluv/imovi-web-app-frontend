import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { movieDetailReducer } from "./DetailReducer"
import { moviesReducer } from "./moviesReducer"

const rootReducer = combineReducers({
	movies: moviesReducer,
	movieDetail: movieDetailReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))