import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native'
import { GEOFENCING_TASK } from './TaskManager'
import { localData } from '../../../library/localData'

export default async (data = []) => {
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

  if (data !== []) {
    const regionArray = data
      .filter(item => item.coordinate.latitude)
      .map(marker => {
        const { coordinate, id, name } = marker
        return {
          identifier: `${id}-${name}`,
          ...coordinate,
          radius: 5
        }
      })

    await Location.startGeofencingAsync(
      GEOFENCING_TASK,
      Platform.OS === 'ios' ? regionArray.slice(0, 20) : regionArray
    )

    console.log('Start geofencing')
  }
}
