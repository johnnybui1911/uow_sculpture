import {
  INIT_MARKERS,
  MARKER_SELECTED,
  MARKER_UNSELECTED
} from '../../assets/actionTypes'

export const setInitMarkers = data => {
  const markers = data.map(marker => {
    const { id, name, coordinate } = marker
    return { id, name, coordinate, pressed: false }
  })
  //   console.log(markers)
  return { type: INIT_MARKERS, payload: markers }
}

export const selectMarker = markerID => {
  return { type: MARKER_SELECTED, markerID }
}

export const unselectMarker = () => {
  return { type: MARKER_UNSELECTED }
}
