import numeral from 'numeral'
import axios from 'axios'
import {
  FETCH_DISTANCE_SUCCESSFUL,
  FETCH_DISTANCE_PENDING,
  FETCH_DISTANCE_REJECTED,
  OPEN_MODAL
} from '../../assets/actionTypes'
import { DISTANCE_MATRIX_API, GOOGLE_MAPS_APIKEY } from '../../library/maps'

export const fetchDistanceSuccessful = distanceMatrix => {
  return {
    type: FETCH_DISTANCE_SUCCESSFUL,
    payload: { data: distanceMatrix, isLoading: false }
  }
}

export const fetchDistancePending = () => {
  return { type: FETCH_DISTANCE_PENDING, payload: { isLoading: true } }
}

export const fetchDistanceRejected = () => {
  return { type: FETCH_DISTANCE_REJECTED, payload: { isLoading: false } }
}

export const fetchDistanceMatrix = (userCoord = null, newData = null) => {
  return (dispatch, getState) => {
    let userCoordinate = userCoord
    if (!userCoord) {
      userCoordinate = getState().locationReducer.userCoordinate
    }
    const { markers } = getState().markerReducer
    let initialData = newData
    if (!newData || markers) {
      initialData = markers
    }
    const data = initialData.filter(item => item.coordinate.latitude)

    let destinations = ''
    data.forEach(marker => {
      const { latitude, longitude } = marker.coordinate
      destinations += `${latitude}%2C${longitude}%7C`
    })
    destinations.length > 0 &&
      userCoordinate &&
      axios
        .get(
          `${DISTANCE_MATRIX_API}&origins=${userCoordinate.latitude},${userCoordinate.longitude}&destinations=${destinations}&key=${GOOGLE_MAPS_APIKEY}`
        )
        .then(response => {
          return response.data
        })
        .then(mapData => {
          const distance_duration_array = mapData.rows[0].elements
          const distanceMatrix = {}
          let enteredMarkers = []
          data.forEach((marker, index) => {
            const { distance, duration } = distance_duration_array[index]
            const { id } = marker
            distanceMatrix[id] = {
              id,
              distance: distance.value,

              duration: Math.floor(duration.value / 60)
            }
            if (distance.value <= 10) {
              enteredMarkers = [
                ...enteredMarkers,
                {
                  id,
                  name: marker.name,
                  coordinate: marker.coordinate,
                  photoURL: marker.photoURL
                }
              ]
            }
          })

          return { distanceMatrix, enteredMarkers }
        })
        .then(({ distanceMatrix, enteredMarkers }) => {
          dispatch({ type: OPEN_MODAL, enteredMarkers })
          dispatch(fetchDistanceSuccessful(distanceMatrix))
        })
        .catch(error => {
          console.log(error)
          dispatch(fetchDistanceRejected())
        })
  }
}