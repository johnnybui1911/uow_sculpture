import { combineReducers } from 'redux'
import markerReducer from './markerReducer'
import authReducer from './authReducer'
import locationReducer from './locationReducer'

export default combineReducers({ markerReducer, authReducer, locationReducer })
