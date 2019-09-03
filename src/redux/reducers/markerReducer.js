import {
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  FETCH_DATA_SUCCESSFUL,
  FETCH_DATA_REJECTED,
  FETCH_DATA_PENDING
} from '../../assets/actionTypes'

const initialState = {
  markers: [],
  selectedMarker: null,
  isLoading: true
}

const markerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESSFUL: {
      const { data, isLoading } = action.payload
      if (state.selectedMarker) {
        state.selectedMarker = data.find(
          marker => marker.id === state.selectedMarker.id
        )
      }
      return { ...state, isLoading, markers: data }
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
      const { markerID } = action
      const { markers } = state

      const selectedMarker = markers.find(marker => marker.id === markerID)

      return { ...state, selectedMarker }
    }

    case MARKER_UNSELECTED: {
      return { ...state, selectedMarker: null }
    }
    default:
      return state
  }
}

export default markerReducer
