import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import { Alert, Linking, Platform } from 'react-native'
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

const _openSetting = () => {
  if (Platform.OS == 'ios') {
    Linking.openURL('app-settings:')
  } else {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
    )
  }
}

export const _alertLocationPermission = () => {
  Alert.alert(
    Platform.OS === 'ios'
      ? 'Turn On Location Services to Allow "UOWAC" to Determine Your Location'
      : 'Turn On Location Services',
    '',
    [
      {
        text: 'Settings',
        onPress: () => {
          _openSetting()
        },
        style: 'default'
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
    ],
    { cancelable: false }
  )
}

export const syncLocationThunk = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      const { userCoordinate } = getState().locationReducer
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        dispatch(syncLocationRejected())
        Platform.OS === 'ios' && _alertLocationPermission()
        console.log('Need Location Permission')
        reject()
      } else {
        if (!userCoordinate) {
          console.log('Watch location')
          try {
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
                  reject()
                }
              }
            )
          } catch (e) {
            console.log('Not allow Location Permission')
            reject()
          }
        } else {
          console.log('Get current location')
          try {
            const loc = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Highest
            })
            if (loc.timestamp) {
              const { latitude, longitude } = loc.coords
              dispatch(syncLocationSuccessful({ latitude, longitude }))
              dispatch(fetchDistanceMatrix(loc.coords))
              resolve()
            } else {
              dispatch(syncLocationRejected())
              console.log('error fetch location expo')
              reject()
            }
          } catch (e) {
            console.log('Not allow Location Permission')
            reject()
          }
        }
      }
    })
  }
}
