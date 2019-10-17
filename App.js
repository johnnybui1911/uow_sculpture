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
import {
  BACKGROUND_LOCATION_TASK,
  GEOFENCING_TASK
} from './src/containers/Map/Background/TaskManager'
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
    locationAccess: false,
    dataFetchStatus: true
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

  _loadDataAsync = () => {
    const loadFont = Font.loadAsync({
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Font-Name': require('./assets/icons/icomoon.ttf')
    })
    const imageAssets = cacheImages([...imageCacheList])

    return Promise.all([loadFont, ...imageAssets])
  }

  // FIXME: BACKGROUND NOT WORKING IN IOS EXPO APP
  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!')
      try {
        await stores.dispatch(syncLocationThunk())
        this.setState({ locationAccess: true })
      } catch (e) {
        this.setState({ locationAccess: false })
      }

      // const geofencingTask = await Location.hasStartedGeofencingAsync(
      //   GEOFENCING_TASK
      // )
      // if (geofencingTask) {
      // Location.stopGeofencingAsync(GEOFENCING_TASK)
      // }
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
    const { locationAccess, isReady, dataFetchStatus } = this.state
    if (!isReady) {
      return (
        <AppLoading
          startAsync={this._loadDataAsync}
          onFinish={async () => {
            await stores.dispatch(thunkSignIn())
            await stores.dispatch(fetchDataThunk())
            try {
              await stores.dispatch(syncLocationThunk())
              this.setState({ isReady: true, locationAccess: true })
            } catch (e) {
              this.setState({ isReady: true, locationAccess: false })
            }
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
          <MainScreen
            locationAccess={locationAccess}
            dataFetchStatus={dataFetchStatus}
          />
        </SafeAreaProvider>
      </Provider>
    )
  }
}
