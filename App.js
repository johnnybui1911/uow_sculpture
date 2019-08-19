import React from 'react'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import { Notifications } from 'expo'
import MainScreen from './src/MainScreen'
import stores from './src/redux/stores'
import { registerForPushNotificationsAsync } from './src/library/Notification'
import syncLocationBackground from './src/containers/Map/Background/syncLocationBackground'
import geofencingRegion from './src/containers/Map/Background/geofencingRegion'

export default class App extends React.PureComponent {
  state = {
    fontLoaded: false,
    notification: {}
  }

  componentDidMount = async () => {
    await registerForPushNotificationsAsync()
    await syncLocationBackground()
    await geofencingRegion()

    await Font.loadAsync({
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Font-Name': require('./assets/icons/icomoon.ttf')
    })

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    )

    this.setState({ fontLoaded: true })
  }

  _handleNotification = notification => {
    this.setState({ notification })
    // console.log('notification', notification)
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={stores}>
          <MainScreen />
        </Provider>
      )
    } else {
      return null
    }
  }
}
