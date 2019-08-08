import React from 'react'
import { SafeAreaView, View, Platform } from 'react-native'
import MapView, { UrlTile, Marker, AnimatedRegion } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import styles from './styles'
import SearchBox from '../../components/SearchButton/SearchBox'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from '../../assets/dimension'
import {
  initialMarkers,
  GOOGLE_MAPS_APIKEY,
  URL_TEMPLATE,
  INITIAL_REGION
} from '../../library/maps'
import images from '../../assets/images'
import MarkerView from './MarkerView'
import MiniView from './MiniView'

class MapScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      region: INITIAL_REGION,
      markers: [],
      selected_marker: false,
      errorMessage: '',
      userCoordinate: null
    }
  }

  componentWillMount = () => {
    const { errorMessage } = this.state
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      this._getLocationAsync()
    }
  }

  componentDidMount = () => {
    this.setState({
      markers: initialMarkers
    })
  }

  componentWillUnmount = () => {
    this.subscribeLocation()
  }

  subscribeLocation = null

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }

    this.subscribeLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1,
        distanceInterval: 1
      },
      loc => {
        if (loc.timestamp) {
          const { userCoordinate, region } = this.state
          const { latitude, longitude } = loc.coords
          const newCoordinate = {
            latitude,
            longitude
          }
          if (!userCoordinate) {
            this.setState({
              userCoordinate: new AnimatedRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
              }),
              region: {
                ...region,
                latitude,
                longitude
              }
            })
          } else {
            userCoordinate.timing(newCoordinate).start()
          }
        } else {
          this.setState({ errorMessage: 'Problems on update location' })
        }
      }
    )
  }
  _renderUserLocation = () => {
    const { errorMessage, userCoordinate } = this.state
    if (userCoordinate) {
      return (
        <Marker.Animated
          ref={marker => {
            this.marker = marker
          }}
          coordinate={userCoordinate}
          image={images.user_location}
        />
      )
    }
  }

  _handleOnPressedMarker = (latitude, longitude) => {
    //center map to selected marker
    this.setState(prevState => ({
      region: { ...prevState.region, latitude, longitude }
    }))
  }

  _selectMarker = () => {
    this.setState({ selected_marker: true })
  }

  _unSelectMarker = () => {
    this.setState({ selected_marker: false })
  }

  _renderMarker = () => {
    const { markers, selected_marker } = this.state
    return (
      <React.Fragment>
        {markers.map(marker => (
          <MarkerView
            key={marker.name}
            marker={marker}
            selected_marker={selected_marker}
            _handleOnPressedMarker={this._handleOnPressedMarker}
          />
        ))}
      </React.Fragment>
    )
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

  _handleSearch = event => {
    const { text } = event.nativeEvent
    this.setState({ searchText: text.trim() })
  }

  render() {
    const { searchText, region, errorMessage } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={{
            flex: 1,
            position: 'absolute',
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH
          }}
          mapType="none"
          region={region}
          showsCompass={false}
          rotateEnabled={false}
          onMarkerPress={this._selectMarker}
          onPress={this._unSelectMarker}
        >
          <UrlTile urlTemplate={URL_TEMPLATE} maximumZ={19} zIndex={-1} />
          {this._renderMarker()}
          {this._renderUserLocation()}
          {/* {this._renderDirection()} */}
        </MapView>
        <View
          style={{
            marginTop: STATUS_BAR_HEIGHT
          }}
        >
          <SearchBox
            _handleSearch={this._handleSearch}
            searchText={searchText}
          />
        </View>
        <MiniView />
      </SafeAreaView>
    )
  }
}

export default MapScreen
