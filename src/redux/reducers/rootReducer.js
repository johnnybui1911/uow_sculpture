import { combineReducers } from 'redux'
import markerReducer from './markerReducer'
import authReducer from './authReducer'

export default combineReducers({ markerReducer, authReducer })
