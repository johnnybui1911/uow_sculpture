import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import { Platform } from 'react-native'
import {
  _sendPushNotification,
  _sendLocalNotification
} from '../../../library/notificationTask'

export const BACKGROUND_LOCATION_TASK = 'BACKGROUND_LOCATION_TASK'
export const GEOFENCING_TASK = 'GEOFENCING_TASK'

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ data, error }) => {
  if (error) {
    console.log(error)
    return
  }
  if (data) {
    const { locations } = data
    // console.log('Background Update Location: ', locations)
  }
})

TaskManager.defineTask(
  GEOFENCING_TASK,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      console.log(error)
      return
    }

    const { identifier } = region
    const name = identifier.slice(identifier.indexOf('-') + 1)
    const id = identifier.slice(0, identifier.indexOf('-'))
    if (eventType === Location.GeofencingEventType.Enter) {
      _sendLocalNotification({
        title:
          Platform.OS === 'ios'
            ? `You have visited ${name}.`
            : `Congratulations! You have visited ${name}.`,
        body: 'Tap to view more details',
        data: {
          screen: 'Detail',
          id
        }
      })
      console.log("You've entered region:", region)
    } else if (eventType === Location.GeofencingEventType.Exit) {
      // _sendLocalNotification({
      //   title: `Left ${name}`,
      //   body: `${region.latitude}, ${region.longitude}`,
      //   data: {
      //     screen: 'Map'
      //   }
      // })
      // console.log("You've left region:", region)
    }
  }
)
