import { AsyncStorage } from 'react-native'
import { SIGN_IN_SUCCESSFULL, SIGN_IN_REJECTED } from '../../assets/actionTypes'

const initialState = { loggedIn: false, user: null }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESSFULL: {
      return { ...state, loggedIn: true, user: action.payload.user }
    }
    case SIGN_IN_REJECTED: {
      return { ...state, loggedIn: false, user: null }
    }
    default:
      return state
  }
}

export default authReducer
