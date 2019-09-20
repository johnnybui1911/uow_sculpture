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
  isLoading: true,
  statisticMatrix: {}
}

const markerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESSFUL: {
      const { data, isLoading } = action.payload
      const markerMatrix = {}
      const { statisticMatrix } = state
      data.forEach(element => {
        const { id, likeCount, commentCount } = element
        if (!statisticMatrix[id]) {
          statisticMatrix[id] = {
            id,
            likeCount,
            commentCount,
            isLiked: false
          }
        } else {
          statisticMatrix[id] = {
            id,
            likeCount,
            commentCount,
            isLiked: statisticMatrix[id].isLiked
          }
        }
        markerMatrix[id] = {
          ...element
        }
      })
      return {
        ...state,
        isLoading,
        markers: data,
        statisticMatrix: { ...statisticMatrix },
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

    case ADD_COMMENT: {
      const {
        comment: { sculptureId }
      } = action.payload
      const { statisticMatrix } = state
      statisticMatrix[sculptureId].commentCount++
      return { ...state, statisticMatrix: { ...statisticMatrix } }
    }

    case FETCH_USER_DATA_SUCCESSFULL: {
      // after already fetch statisticaMatrix from backend data
      const { statisticMatrix } = state
      const { likeList } = action.payload
      likeList.forEach(element => {
        let { sculptureId } = element
        let { likeCount, commentCount } = statisticMatrix[sculptureId]
        statisticMatrix[sculptureId] = {
          id: sculptureId,
          likeCount,
          commentCount,
          isLiked: true
        }
      })
      return { ...state, statisticMatrix: { ...statisticMatrix } }
    }

    case SIGN_IN_REJECTED: {
      const { statisticMatrix } = state
      Object.entries(statisticMatrix).forEach(([key, value]) => {
        statisticMatrix[key] = {
          ...value,
          isLiked: false
        }
      })

      return { ...state, statisticMatrix: { ...statisticMatrix } }
    }

    default:
      return state
  }
}

export default markerReducer
