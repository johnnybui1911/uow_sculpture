import { SIGN_IN_SUCCESSFULL, SIGN_IN_REJECTED } from '../../assets/actionTypes'

const initialState = {
  loggedIn: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSFULL: {
      return { ...state, loggedIn: true }
    }
    case SIGN_IN_REJECTED: {
      return { ...state, loggedIn: false }
    }
    default:
      return state
  }
}

export default authReducer
