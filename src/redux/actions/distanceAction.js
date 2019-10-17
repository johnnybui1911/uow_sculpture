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
    const { markerMatrix } = getState().markerReducer
    let markers = []
    Object.entries(markerMatrix).forEach(([key, value]) => {
      markers.push(value)
    })
    const data = markers.filter(item => item.coordinate.latitude)
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
        if (distance <= 15) {
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
