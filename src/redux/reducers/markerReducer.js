import {
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  INIT_MARKERS,
  FETCH_DATA_REJECTED
} from '../../assets/actionTypes'

const initialState = {
  markers: [],
  selectedMarker: null
}

// FIXME:
const markerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MARKERS: {
      // let { selectedMarker } = state
      // if (selectedMarker) {
      //   selectedMarker = action.payload.find(
      //     marker => marker.id === selectedMarker.id
      //   )
      //   return { ...state, markers: action.payload, selectedMarker }
      // }
      return { ...state, markers: action.payload }
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

    case FETCH_DATA_REJECTED: {
      return { ...state }
    }

    default:
      return state
  }
}

export default markerReducer
