/*
Nam Hoang Bui - 5520125 - UOW Sculptures
*/
import React from 'react'
import { Provider } from 'react-redux'
import { AppState } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Location from 'expo-location'
import { AppLoading } from 'expo'
import MainScreen from './src/MainScreen'
import stores from './src/redux/stores'
import { registerForPushNotificationsAsync } from './src/library/notificationTask'
import syncLocationBackground from './src/containers/Map/Background/syncLocationBackground'
import geofencingRegion from './src/containers/Map/Background/geofencingRegion'
import { BACKGROUND_LOCATION_TASK } from './src/containers/Map/Background/TaskManager'
import {
  fetchDataThunk,
  thunkSignIn,
  syncLocationThunk
} from './src/redux/actions'
import { imageCacheList } from './src/assets/images'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export default class App extends React.PureComponent {
  state = {
    isReady: false,
    appState: AppState.currentState,
    notification: {},
    isConnected: false
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this._handleAppStateChange)
    // this._notificationSubscription = await Notifications.addListener(
    //   this._handleNotification
    // )
    // await syncLocationBackground()
    // await geofencingRegion()
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
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _loadDataAsync = async () => {
    await stores.dispatch(thunkSignIn())
    const fetchData = stores.dispatch(fetchDataThunk())
    const loadFont = Font.loadAsync({
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Font-Name': require('./assets/icons/icomoon.ttf')
    })
    const imageAssets = cacheImages([...imageCacheList])

    await Promise.all([fetchData, loadFont, ...imageAssets])
  }

  // FIXME: BACKGROUND NOT WORKING IN IOS EXPO APP
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
      // stores.dispatch(syncLocationThunk())
    } else if (nextAppState.match(/inactive|background/)) {
      // await syncLocationBackground()
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
          startAsync={this._loadDataAsync}
          onFinish={async () => {
            await stores.dispatch(syncLocationThunk())
            this.setState({ isReady: true })
          }}
          onError={() => {
            console.log('Error')
          }}
        />
      )
    }
    return (
      <Provider store={stores}>
        <SafeAreaProvider>
          <MainScreen />
        </SafeAreaProvider>
      </Provider>
    )
  }
}
