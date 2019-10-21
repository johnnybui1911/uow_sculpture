/**
 * Description: Redux Stores
 * Author: Nam Bui
 **/

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import { getAsyncSearch } from '../actions/searchActions'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

store.dispatch(getAsyncSearch())
