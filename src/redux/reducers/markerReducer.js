import {
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  MAP_SELECTED,
  INIT_MARKERS
} from '../../assets/actionTypes'

const initialState = {
  markers: [],
  selected: false,
  selected_id: null
}

const markerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MARKERS: {
      return { ...state, markers: action.payload }
    }

    case MARKER_SELECTED: {
      const { markerID } = action
      const { markers } = state

      markers.map(marker => {
        if (marker.id !== markerID) {
          marker.pressed = false
        } else {
          marker.pressed = true
        }
      })

      return { ...state, markers, selected: true, selected_id: markerID }
    }

    case MARKER_UNSELECTED: {
      const { markers } = state
      markers.map(marker => {
        marker.pressed = false
      })

      return { ...state, markers, selected: false, selected_id: null }
    }

    default:
      return state
  }
}

export default markerReducer
