import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native'
import { GEOFENCING_TASK } from './TaskManager'
import { localData } from '../../../library/localData'

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

  const regionArray = localData.map(marker => {
    const { coordinate } = marker
    return {
      ...coordinate,
      radius: 5
    }
  })

  await Location.startGeofencingAsync(GEOFENCING_TASK, regionArray)

  console.log('Start geofencing')
}
