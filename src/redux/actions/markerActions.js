import numeral from 'numeral'
import {
  INIT_MARKERS,
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  FETCH_DATA_REJECTED
} from '../../assets/actionTypes'
import { DISTANCE_MATRIX_API, GOOGLE_MAPS_APIKEY } from '../../library/maps'

// const fetchDistanceMatrix = async (origin, destination) => {
//   const originText = `${origin.latitude},${origin.longitude}`
//   const destinationText = `${destination.latitude},${destination.longitude}`
//   fetch(
//     `${DISTANCE_MATRIX_API}&origins=${originText}&destinations=${destinationText}&key=${GOOGLE_MAPS_APIKEY}`
//   )
//     .then(response => response.json())
//     .then(mapData => {
//       const distance_duration = mapData.rows[0].elements[0]
//       return Promise.resolve(distance_duration)
//     })
//     .catch(() => {
//       return Promise.reject()
//     })
// }

export const setInitMarkers = data => {
  //   console.log(markers)
  return { type: INIT_MARKERS, payload: data }
}

export const fetchDataRejected = () => {
  return { type: FETCH_DATA_REJECTED }
}

export const selectMarker = markerID => {
  return { type: MARKER_SELECTED, markerID }
}

export const unselectMarker = () => {
  return { type: MARKER_UNSELECTED }
}

// FIXME:
export const fetchDataThunk = (data, userCoordinate) => {
  return (dispatch, getState) => {
    // const { userCoordinate } = getState().locationReducer
    let destinations = ''
    data.forEach(marker => {
      const { latitude, longitude } = marker.coordinate
      destinations += `${latitude}%2C${longitude}%7C`
    })
    destinations.length > 0 &&
      userCoordinate &&
      fetch(
        `${DISTANCE_MATRIX_API}&origins=${userCoordinate.latitude},${userCoordinate.longitude}&destinations=${destinations}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then(response => response.json())
        .then(mapData => {
          const distance_duration_array = mapData.rows[0].elements
          const newData = data.map((marker, index) => {
            const { distance, duration } = distance_duration_array[index]
            return {
              ...marker,
              distance:
                distance.value >= 1000
                  ? numeral(distance.value).format('0.0 a') + 'm'
                  : `${distance.value} m`,
              duration: Math.floor(duration.value / 60)
            }
          })

          dispatch(setInitMarkers(newData))
        })
        .catch(error => dispatch(fetchDataRejected()))
  }
}
