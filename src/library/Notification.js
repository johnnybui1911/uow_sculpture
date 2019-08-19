/* eslint-disable import/prefer-default-export */
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { storeData } from './asyncStorage'

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
    return
  }
  const token = await Notifications.getExpoPushTokenAsync()
  storeData('token', token)
  // console.log(token)
}
