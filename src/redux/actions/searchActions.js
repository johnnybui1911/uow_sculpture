import { AsyncStorage } from 'react-native'
import { INSERT_SEARCH_ITEM, SET_INIT_SEARCH } from '../../assets/actionTypes'

export const insertSearchItem = item => {
  console.log(item)
  return { type: INSERT_SEARCH_ITEM, payload: { item } }
}

export const setInitSearch = recentSearchList => {
  return {
    type: SET_INIT_SEARCH,
    payload: recentSearchList ? recentSearchList : []
  }
}

/* Use normal Async Storage */

export const getAsyncSearch = () => {
  return dispatch => {
    AsyncStorage.getItem('recentSearchList').then(result => {
      dispatch(setInitSearch(JSON.parse(result)))
    })
  }
}
