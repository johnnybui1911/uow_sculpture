/* eslint-disable import/prefer-default-export */
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { storeData, getData } from './asyncStorage'

// Notifications.deleteChannelAndroidAsync('MAP_CONGRATULATION')

Notifications.createChannelAndroidAsync('MAP_CONGRATULATION', {
  name: 'MAP_CONGRATULATION',
  description: 'Congratulation',
  sound: true,
  priority: 'max',
  vibrate: [0, 250, 250, 250],
  badge: true
})

Notifications.deleteCategoryAsync('NOTI_ACTION')

Notifications.createCategoryAsync('NOTI_ACTION', [
  {
    actionId: 'view',
    buttonTitle: 'VIEW',
    isDestructive: false,
    isAuthenticationRequired: false
  },
  {
    actionId: 'archive',
    buttonTitle: 'ARCHIVE',
    isDestructive: true,
    isAuthenticationRequired: false
  }
])

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

export const _sendLocalNotification = async notiMessage => {
  await Notifications.presentLocalNotificationAsync({
    categoryId: 'NOTI_ACTION',
    ios: {
      sound: true,
      _displayInForeground: true
    },
    android: {
      channelId: 'MAP_CONGRATULATION'
    },
    ...notiMessage
  })
}

export const _sendPushNotification = notiMessage => {
  getData('token')
    .then(token => {
      const message = {
        ...notiMessage,
        to: token,
        sound: 'default',
        _displayInForeground: true,
        priority: 'high',
        channelId: 'MAP_CONGRATULATION' // API > 8.0
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

export const _handleNotification = (
  notification,
  navigation,
  _resetUI = null
) => {
  console.log(notification)
  if (notification.origin === 'selected' && notification.data) {
    if (notification.actionId === 'archive') {
      Notifications.dismissNotificationAsync(notification.notificationId)
    } else {
      if (_resetUI) {
        _resetUI()
      }
      if (notification.data.screen === 'Detail') {
        navigation.navigate('Detail', { id: notification.data.id })
      } else {
        navigation.navigate('Map')
      }
    }
  }
}
