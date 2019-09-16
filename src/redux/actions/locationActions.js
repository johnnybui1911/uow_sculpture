import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import {
  SYNC_LOCATION_SUCCESSFULL,
  SYNC_LOCATION_REJECTED
} from '../../assets/actionTypes'
import { fetchDataThunk } from './markerActions'
import { fetchDistanceMatrix } from './distanceAction'

export const syncLocationSuccessful = userCoordinate => {
  return { type: SYNC_LOCATION_SUCCESSFULL, userCoordinate }
}

export const syncLocationRejected = () => {
  return { type: SYNC_LOCATION_REJECTED }
}

export const syncLocationThunk = data => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        dispatch(syncLocationRejected())
      } else {
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1,
            distanceInterval: 10
          },
          loc => {
            if (loc.timestamp) {
              const { latitude, longitude } = loc.coords
              dispatch(syncLocationSuccessful({ latitude, longitude }))
              dispatch(fetchDistanceMatrix(loc.coords, data))
            } else {
              dispatch(syncLocationRejected())
            }
          }
        )
      }
    })
  }
}
