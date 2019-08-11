import {
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  INIT_MARKERS
} from '../../assets/actionTypes'

const initialState = {
  markers: [],
  selectedMarker: null
}

const markerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MARKERS: {
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

    default:
      return state
  }
}

export default markerReducer
