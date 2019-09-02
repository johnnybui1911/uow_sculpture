import React from 'react'
import { Provider } from 'react-redux'
import { AppState } from 'react-native'
import * as Font from 'expo-font'
import * as Location from 'expo-location'
import { Notifications, AppLoading } from 'expo'
import MainScreen from './src/MainScreen'
import stores from './src/redux/stores'
import { registerForPushNotificationsAsync } from './src/library/notificationTask'
import syncLocationBackground from './src/containers/Map/Background/syncLocationBackground'
import geofencingRegion from './src/containers/Map/Background/geofencingRegion'
import { BACKGROUND_LOCATION_TASK } from './src/containers/Map/Background/TaskManager'

export default class App extends React.PureComponent {
  state = {
    isReady: false,
    appState: AppState.currentState,
    notification: {}
  }

  componentDidMount = async () => {
    // AppState.addEventListener('change', this._handleAppStateChange)
    // this._notificationSubscription = await Notifications.addListener(
    //   this._handleNotification
    // )
    // await syncLocationBackground()
    // await geofencingRegion()
    // await registerForPushNotificationsAsync()
    // stop background sync when open app
    // const backgroundSync = await Location.hasStartedLocationUpdatesAsync(
    //   BACKGROUND_LOCATION_TASK
    // )
    // if (backgroundSync) {
    //   await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    //   console.log('Stop syncing Background')
    // }
  }

  componentWillUnmount = () => {
    // AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _loadFontAsync = async () => {
    await Font.loadAsync({
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Font-Name': require('./assets/icons/icomoon.ttf')
    })
    return Promise.resolve()
  }

  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const backgroundSync = await Location.hasStartedLocationUpdatesAsync(
        BACKGROUND_LOCATION_TASK
      )
      if (backgroundSync) {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
        console.log('Stop syncing Background')
      }
      console.log('App has come to the foreground!')
    } else if (nextAppState.match(/inactive|background/)) {
      await syncLocationBackground()
      await geofencingRegion()
      console.log('App is going to background')
    }

    this.setState({ appState: nextAppState })
  }

  _handleNotification = notification => {
    this.setState({ notification })
    console.log('notification', notification)
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadFontAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <Provider store={stores}>
        <MainScreen />
      </Provider>
    )
  }
}
