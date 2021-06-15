import {ADD_USER, UPDATE_PROFILE_PICTURE, UPDATE_USER, FORM_SUBMITION_STATUS, LOGIN} from '../types'

const initialState = {
	profile: {
	  username: '',
	  email: '',
	  password: ''
	},
	formSubmitted: false
  }
  
  const reducer = (state = initialState, action) => {
	switch (action.type) {
	  case LOGIN:
	  console.log('login', action.payload.user)
		return {
		  ...state,
		  profile: action.payload.user,
		  formSubmitted: false // after update user formsubmition reset
		}
	  case ADD_USER:
		return {
		  ...state,
		  profile: action.payload.user,
		  formSubmitted: false // after update user formsubmition reset
		}
	  case UPDATE_USER:
		return {
		  ...state,
		  profile: action.payload.user,
		  formSubmitted: false // after update user formsubmition reset
		}
	  case UPDATE_PROFILE_PICTURE:
		return {
		  ...state,
		  profile: {
			...state.profile,
			profileImage: action.payload.image
		  }
		}
	  case FORM_SUBMITION_STATUS:
		return {
		  ...state,
		  formSubmitted: action.payload.status
		}
	  default:
		return state;
	}
  }
  
  export default reducer;