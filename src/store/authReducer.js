const defaultState = {
	userInfo: {},
	isAuthorised: false
}

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const LOGOUT = 'LOGOUT'

export const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOGIN:
			return { ...state, userInfo: action.payload, isAuthorised: true }
		case REGISTER:
			return { ...state, userInfo: action.payload, isAuthorised: true }
		case LOGOUT:

			return { ...state, userInfo: action.payload, isAuthorised: false }
		default:
			return state
	}
}

export const loginAction = (payload) => ({ type: LOGIN, payload })
export const registerAction = (payload) => ({ type: REGISTER, payload })
export const logoutAction = (payload) => ({ type: LOGOUT, payload })