import { INSERT_SEARCH_ITEM, SET_INIT_SEARCH } from '../../assets/actionTypes'
import { storeData } from '../../library/asyncStorage'

const initialState = {
  recentSearchList: []
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT_SEARCH: {
      return { ...state, recentSearchList: action.payload }
    }
    case INSERT_SEARCH_ITEM: {
      const { item } = action.payload
      const oldSearchList = state.recentSearchList

      let recentSearchList = [
        { id: item.id, name: item.name, recent: true, features: item.features },
        ...oldSearchList
      ]
      if (recentSearchList.length > 5) {
        recentSearchList = recentSearchList.slice(0, 5)
      }

      const uniqueList = recentSearchList.reduce((unique, searchItem) => {
        const condition =
          unique.filter(element => element.id == searchItem.id).length === 1
        if (condition) {
          return unique
        } else {
          return [...unique, searchItem]
        }
      }, [])
      storeData('recentSearchList', JSON.stringify(uniqueList))
      return { ...state, recentSearchList: uniqueList }
    }

    default: {
      return state
    }
  }
}

export default searchReducer
