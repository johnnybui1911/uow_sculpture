import {
  INIT_MARKERS,
  MARKER_SELECTED,
  MARKER_UNSELECTED
} from '../../assets/actionTypes'

export const setInitMarkers = data => {
  //   console.log(markers)
  return { type: INIT_MARKERS, payload: data }
}

export const selectMarker = markerID => {
  return { type: MARKER_SELECTED, markerID }
}

export const unselectMarker = () => {
  return { type: MARKER_UNSELECTED }
}
