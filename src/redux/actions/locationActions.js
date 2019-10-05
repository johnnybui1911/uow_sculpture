import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import {
  SYNC_LOCATION_SUCCESSFULL,
  SYNC_LOCATION_REJECTED
} from '../../assets/actionTypes'
import { fetchDistanceMatrix } from './distanceAction'

export const syncLocationSuccessful = userCoordinate => {
  return { type: SYNC_LOCATION_SUCCESSFULL, userCoordinate }
}

export const syncLocationRejected = () => {
  return { type: SYNC_LOCATION_REJECTED }
}

export const syncLocationThunk = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        dispatch(syncLocationRejected())
        console.log('Need Location Permission')
        resolve()
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
              dispatch(fetchDistanceMatrix(loc.coords))
              resolve()
            } else {
              dispatch(syncLocationRejected())
              console.log('error fetch location expo')
              resolve()
            }
          }
        )
      }
    })
  }
}
