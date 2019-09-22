import {
  FETCH_DISTANCE_SUCCESSFUL,
  FETCH_DISTANCE_PENDING,
  FETCH_DISTANCE_REJECTED
} from '../../assets/actionTypes'

const initialState = {
  distanceMatrix: null,
  isLoading: true
}

const distanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISTANCE_SUCCESSFUL: {
      const { data, isLoading } = action.payload
      return { ...state, isLoading, distanceMatrix: data }
    }

    case FETCH_DISTANCE_REJECTED: {
      const { isLoading } = action.payload
      return { ...state, isLoading }
    }

    case FETCH_DISTANCE_PENDING: {
      const { isLoading } = action.payload
      return { ...state, isLoading }
    }
    default:
      return state
  }
}

export default distanceReducer
