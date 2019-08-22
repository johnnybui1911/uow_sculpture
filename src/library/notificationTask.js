/* eslint-disable import/prefer-default-export */
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { storeData, getData } from './asyncStorage'

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
  console.log(token)
}

export const _sendPushNotification = notiMessage => {
  getData('token')
    .then(token => {
      const message = {
        ...notiMessage,
        to: token,
        sound: 'default',
        _displayInForeground: true,
        badge: 1
      }

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      })
    })
    .catch(e => console.log(e))

  // const data = response._bodyInit
  // console.log(`Status & Response ID-> ${data}`)
}
