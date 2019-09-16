import { combineReducers } from 'redux'
import markerReducer from './markerReducer'
import authReducer from './authReducer'
import locationReducer from './locationReducer'
import searchReducer from './searchReducer'
import distanceReducer from './distanceReducer'

export default combineReducers({
  markerReducer,
  authReducer,
  locationReducer,
  searchReducer,
  distanceReducer
})
