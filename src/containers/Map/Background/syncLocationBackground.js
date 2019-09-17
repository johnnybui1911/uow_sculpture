import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native'
import { BACKGROUND_LOCATION_TASK } from './TaskManager'

export default async () => {
  const {
    status,
    permissions: { Location: ios }
  } = await Permissions.askAsync(Permissions.LOCATION)

  if (status !== 'granted') {
    return
  }

  if (Platform.OS === 'ios') {
    if (ios !== 'always') {
      return
    }
  }

  console.log('Start sync location background')
  await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 1,
    distanceInterval: 1
  })
}
