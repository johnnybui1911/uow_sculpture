import numeral from 'numeral'
import {
  FETCH_DATA_SUCCESSFUL,
  MARKER_SELECTED,
  MARKER_UNSELECTED,
  FETCH_DATA_REJECTED,
  FETCH_DATA_PENDING
} from '../../assets/actionTypes'
import { localData } from '../../library/localData'
import { DISTANCE_MATRIX_API, GOOGLE_MAPS_APIKEY } from '../../library/maps'

// const fetchDistanceMatrix = async (origin, destination) => {
//   const originText = `${origin.latitude},${origin.longitude}`
//   const destinationText = `${destination.latitude},${destination.longitude}`
//   await fetch(
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
// }\

export const fetchDataPending = () => {
  return { type: FETCH_DATA_PENDING, payload: { isLoading: true } }
}

export const fetchDataSuccessful = data => {
  return { type: FETCH_DATA_SUCCESSFUL, payload: { data, isLoading: false } }
}

export const fetchDataRejected = () => {
  return { type: FETCH_DATA_REJECTED, payload: { isLoading: false } }
}

export const selectMarker = markerID => {
  return { type: MARKER_SELECTED, markerID }
}

export const unselectMarker = () => {
  return { type: MARKER_UNSELECTED }
}

export const fetchDataThunk = userCoordinate => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(fetchDataPending())
      const data = localData
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
            return newData
          })
          .then(newData => {
            dispatch(fetchDataSuccessful(newData))
            resolve({ isDataLoading: false })
          })
          .catch(error => {
            dispatch(fetchDataRejected())
            reject(error)
          })
    })
  }
}
