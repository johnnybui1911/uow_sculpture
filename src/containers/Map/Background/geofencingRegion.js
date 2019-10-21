/**
 * Description:  Geofencing Task
 * Author: Nam Bui
 **/

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Platform } from 'react-native'
import { GEOFENCING_TASK } from './TaskManager'
import stores from '../../../redux/stores'

export default async (data = []) => {
  if (data !== []) {
    const regionArray = data
      .filter(item => item.coordinate.latitude)
      .map(marker => {
        const { coordinate, id, name } = marker
        return {
          identifier: `${id}-${name}`,
          ...coordinate,
          radius: 15 + 10
        }
      })

    try {
      console.log('Start geofencing')
      await Location.startGeofencingAsync(
        GEOFENCING_TASK,
        Platform.OS === 'ios' ? regionArray.slice(0, 20) : regionArray
      )
    } catch (e) {
      console.log('Need Location Permission to Geofencing')
    }
  }
}
