import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'
import MapView, { UrlTile, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import styles from './styles'
import HeaderBar from '../../components/Header/HeaderBar'
import SearchBox from '../../components/SearchButton/SearchBox'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
} from '../../assets/dimension'
import images from '../../assets/images'
import { icons } from '../../assets/icons'
import {
  LATITUDE,
  LONGITUDE,
  initialMarkers,
  GOOGLE_MAPS_APIKEY,
} from '../../library/maps'
import palette from '../../assets/palette'
import MarkerView from './MarkerView'

class MapScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0.0066,
        longitudeDelta: 0.004,
      },
      markers: [],
      selected: false,
      errorMessage: '',
      userLocation: null,
    }
  }

  subscribeLocation = null

  componentDidMount = () => {
    this.setState({
      markers: initialMarkers,
    })
  }

  componentWillMount = () => {
    const { errorMessage } = this.state
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      })
    } else {
      this._getLocationAsync()
    }
  }

  componentWillUnmount = () => {
    this.subscribeLocation()
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    this.subscribeLocation = await Location.watchPositionAsync(
      { enableHighAccuracy: true, timeInterval: 1, distanceInterval: 1 },
      loc => {
        if (loc.timestamp) {
          this.setState({ userLocation: loc })
        } else {
          this.setState({ errorMessage: 'Problems on update location' })
        }
      }
    )

    // const userLocation = await Location.getCurrentPositionAsync({});

    // this.setState({ userLocation });
  }

  _handleSearch = event => {
    const { text } = event.nativeEvent
    this.setState({ searchText: text.trim() })
  }

  _selectMarker = () => {
    this.setState({ selected: true })
  }

  _renderUserLocation = () => {
    const { errorMessage, userLocation } = this.state

    if (userLocation) {
      const { latitude, longitude } = userLocation.coords
      const coordinate = { latitude, longitude }
      return (
        <Marker
          coordinate={coordinate}
          image={images.user_location}
          title="User Location"
        />
      )
    }
  }

  _renderDirection = () => {
    // const { userLocation } = this.state
    // if (userLocation) {
    //   const { latitude, longitude } = userLocation.coords
    //   const origin = { latitude, longitude }
    //   const destination = {
    //     latitude: 21.00299,
    //     longitude: 105.86681
    //   }

    return (
      <MapViewDirections
        origin={{ latitude: 37.3318456, longitude: -122.0296002 }}
        destination={{ latitude: 37.771707, longitude: -122.4053769 }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={2}
        strokeColor="hotpink"
        style={{ zIndex: 9 }}
        // onStart={params => {
        //   console.log(
        //     `Started routing between "${params.origin}" and "${
        //       params.destination
        //     }"`
        //   )
        // }}
        // onReady={result => {
        //   console.log(`Distance: ${result.distance} km`)
        //   console.log(`Duration: ${result.duration} min.`)

        //   this.mapVi
        // }}
      />
    )
  }

  render() {
    const {
      searchText,
      markers,
      region,
      selected,
      userLocation,
      errorMessage,
    } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={{
            flex: 1,
            position: 'absolute',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
          }}
          mapType="none"
          initialRegion={region}
          showsCompass={false}
          rotateEnabled={false}
          // initialRegion={{
          //   latitude: 37.3318456,
          //   longitude: -122.0296002,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 1
          // }}
          // onRegionChange={this.onRegionChange}
        >
          {markers.map(marker => (
            <MarkerView
              key={marker.name}
              marker={marker}
              selected={selected}
              _selectMarker={this._selectMarker}
            />
          ))}
          <UrlTile
            urlTemplate="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieW53dyIsImEiOiJjanlyNmg4dDYwN3Z6M210a3E2ZmJoemprIn0.yDLDtTyLhPBSI_qnjes0kw"
            maximumZ={19}
            zIndex={-1}
          />
          {/* {this._renderUserLocation()} */}
          {/* {this._renderDirection()} */}
        </MapView>
        <View
          style={{
            marginTop: STATUS_BAR_HEIGHT,
          }}
        >
          <SearchBox
            _handleSearch={this._handleSearch}
            searchText={searchText}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default MapScreen
