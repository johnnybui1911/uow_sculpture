import {
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  FETCH_DATA_SUCCESSFUL,
  FETCH_DATA_REJECTED,
  FETCH_DATA_PENDING,
  LIKE,
  UNLIKE
} from '../../assets/actionTypes'

const initialState = {
  markerMatrix: {},
  markers: [],
  selectedMarker: null,
  isLoading: true,
  statisticMatrix: {}
}

const markerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESSFUL: {
      const { data, isLoading } = action.payload
      const markerMatrix = {}
      const statisticMatrix = {}
      data.forEach(element => {
        const { id, likeCount, commentCount } = element
        statisticMatrix[id] = {
          id,
          likeCount,
          commentCount,
          isLiked: false
        }
        markerMatrix[id] = {
          ...element
        }
      })
      return {
        ...state,
        isLoading,
        markers: data,
        statisticMatrix,
        markerMatrix
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
      const { statisticMatrix } = state
      const { id } = action
      statisticMatrix[id].isLiked = true

      return { ...state, statisticMatrix: { ...statisticMatrix } } // updating data immutably
    }

    case UNLIKE: {
      const { statisticMatrix } = state
      const { id } = action
      statisticMatrix[id].isLiked = false
      return { ...state, statisticMatrix: { ...statisticMatrix } } // updating data immutably
    }

    default:
      return state
  }
}

export default markerReducer
