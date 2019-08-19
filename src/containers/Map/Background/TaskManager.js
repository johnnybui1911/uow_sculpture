import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'

export const BACKGROUND_LOCATION_TASK = 'BACKGROUND_LOCATION_TASK'
export const GEOFENCING_TASK = 'GEOFENCING_TASK'

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ data, error }) => {
  if (error) {
    return
  }
  if (data) {
    const { locations } = data
    console.log('Background Update Location Run ...', locations)
  }
})

TaskManager.defineTask(
  GEOFENCING_TASK,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      return
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      console.log("You've entered region:", region)
    } else if (eventType === Location.GeofencingEventType.Exit) {
      console.log("You've left region:", region)
    }
  }
)
