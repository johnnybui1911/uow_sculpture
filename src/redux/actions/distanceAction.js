import numeral from 'numeral'
import axios from 'axios'
import {
  FETCH_DISTANCE_SUCCESSFUL,
  FETCH_DISTANCE_PENDING,
  FETCH_DISTANCE_REJECTED,
  OPEN_MODAL,
  VISIT
} from '../../assets/actionTypes'
import { DISTANCE_MATRIX_API, GOOGLE_MAPS_APIKEY } from '../../library/maps'
import { _sendLocalNotification } from '../../library/notificationTask'
import baseAxios from '../../library/api'
import calcDistance from '../../library/calcDistance'

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

export const fetchDistanceMatrix = userCoordinate => {
  return (dispatch, getState) => {
    // let userCoordinate = userCoord
    // if (!userCoord) {
    //   userCoordinate = getState().locationReducer.userCoordinate
    // }
    const { markers } = getState().markerReducer
    const data = markers.filter(item => item.coordinate.latitude)

    // let destinations = ''
    // data.forEach(marker => {
    //   const { latitude, longitude } = marker.coordinate
    //   destinations += `${latitude}%2C${longitude}%7C`
    // })

    if (userCoordinate) {
      const distanceMatrix = {}
      let enteredMarkers = []
      data.forEach(marker => {
        const { latitude, longitude } = marker.coordinate
        const distance = calcDistance(userCoordinate, marker.coordinate)
        const { id } = marker
        distanceMatrix[id] = {
          id,
          distance: distance,
          duration: 0
        }
        if (distance <= 20) {
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

      if (enteredMarkers.length > 0) {
        dispatch(handleVisitThunk(enteredMarkers))
      }
      dispatch(fetchDistanceSuccessful(distanceMatrix))
    }

    // destinations.length > 0 &&
    //   userCoordinate &&
    //   axios
    //     .get(
    //       `${DISTANCE_MATRIX_API}&origins=${userCoordinate.latitude},${userCoordinate.longitude}&destinations=${destinations}&key=${GOOGLE_MAPS_APIKEY}`
    //     )
    //     .then(response => {
    //       return response.data
    //     })
    //     .then(mapData => {
    //       const distance_duration_array = mapData.rows[0].elements
    //       const distanceMatrix = {}
    //       let enteredMarkers = []
    //       data.forEach((marker, index) => {
    //         const { distance, duration } = distance_duration_array[index]
    //         const { id } = marker
    //         distanceMatrix[id] = {
    //           id,
    //           distance: distance.value,

    //           duration: Math.floor(duration.value / 60)
    //         }
    //         if (distance.value <= 20) {
    //           enteredMarkers = [
    //             ...enteredMarkers,
    //             {
    //               id,
    //               name: marker.name,
    //               coordinate: marker.coordinate,
    //               photoURL: marker.photoURL
    //             }
    //           ]
    //         }
    //       })

    //       return { distanceMatrix, enteredMarkers }
    //     })
    //     .then(({ distanceMatrix, enteredMarkers }) => {
    //       if (enteredMarkers.length > 0) {
    //         dispatch(handleVisitThunk(enteredMarkers))
    //       }
    //       dispatch(fetchDistanceSuccessful(distanceMatrix))
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       dispatch(fetchDistanceRejected())
    //     })
  }
}

export const handleVisitThunk = enteredMarkers => {
  return (dispatch, getState) => {
    dispatch({ type: OPEN_MODAL, enteredMarkers })

    const { user } = getState().authReducer
    const { markerMatrix } = getState().markerReducer
    if (user.userId) {
      enteredMarkers.forEach(element => {
        const { id } = element
        if (!markerMatrix[id].isVisited) {
          baseAxios
            .post('visit', {
              sculptureId: id
            })
            .then(res => {
              console.log(res.data)
            })
            .catch(e => console.log('Can not visit'))
        }
      })
      dispatch({ type: VISIT, enteredMarkers })
    }
  }
}
