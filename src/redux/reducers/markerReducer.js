import {
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  FETCH_DATA_SUCCESSFUL,
  FETCH_DATA_REJECTED,
  FETCH_DATA_PENDING,
  LIKE,
  UNLIKE,
  SIGN_IN_SUCCESSFULL,
  SIGN_IN_REJECTED,
  FETCH_USER_DATA_SUCCESSFULL,
  ADD_COMMENT
} from '../../assets/actionTypes'

const initialState = {
  markerMatrix: {},
  markers: [],
  selectedMarker: null,
  isLoading: true
}

const markerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESSFUL: {
      const { data, isLoading } = action.payload
      const { markerMatrix } = state
      data.forEach(element => {
        const { id, likeCount, commentCount } = element
        if (!markerMatrix[id]) {
          markerMatrix[id] = {
            ...element,
            likeId: null
          }
        } else {
          markerMatrix[id] = {
            ...element,
            likeId: markerMatrix[id].likeId
          }
        }
      })
      return {
        ...state,
        isLoading,
        markers: data,
        markerMatrix: { ...markerMatrix }
      }
    }

    case FETCH_DATA_REJECTED: {
      const { isLoading } = action.payload
      return { ...state, isLoading }
    }

    case FETCH_DATA_PENDING: {
      const { isLoading } = action.payload
      return { ...state, isLoading }
    }

    case MARKER_SELECTED: {
      const { selectedMarker } = action
      return { ...state, selectedMarker }
    }

    case MARKER_UNSELECTED: {
      return { ...state, selectedMarker: null }
    }

    case LIKE: {
      const { markerMatrix } = state
      const { id, likeId } = action
      markerMatrix[id].likeId = likeId
      markerMatrix[id].likeCount++
      return {
        ...state,
        markerMatrix: { ...markerMatrix }
      } // updating data immutably
    }

    case UNLIKE: {
      const { markerMatrix } = state
      const { id } = action
      markerMatrix[id].likeId = null
      markerMatrix[id].likeCount--
      return {
        ...state,
        markerMatrix: { ...markerMatrix }
      } // updating data immutably
    }

    case ADD_COMMENT: {
      const {
        comment: { sculptureId }
      } = action.payload
      const { markerMatrix } = state
      markerMatrix[sculptureId] = {
        ...markerMatrix[sculptureId],
        commentCount: markerMatrix[sculptureId].commentCount + 1
      }
      return {
        ...state,
        markerMatrix: {
          ...markerMatrix
        }
      }
    }

    case FETCH_USER_DATA_SUCCESSFULL: {
      // after already fetch statisticaMatrix from backend data
      const { markerMatrix } = state
      const { likeList } = action.payload
      likeList.forEach(element => {
        let { sculptureId, likeId } = element
        markerMatrix[sculptureId].likeId = likeId
      })
      return {
        ...state,
        markerMatrix: { ...markerMatrix }
      }
    }

    case SIGN_IN_REJECTED: {
      const { markerMatrix } = state

      Object.entries(markerMatrix).forEach(([key, value]) => {
        markerMatrix[key].likeId = null
      })

      return {
        ...state,
        markerMatrix: { ...markerMatrix }
      }
    }

    default:
      return state
  }
}

export default markerReducer
