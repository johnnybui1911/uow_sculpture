import React from 'react'
import { SafeAreaView, View, Platform } from 'react-native'
import MapView, { UrlTile, Marker, AnimatedRegion } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { connect } from 'react-redux'
import numeral from 'numeral'
import styles from './styles'
import images from '../../assets/images'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from '../../assets/dimension'
import {
  GOOGLE_MAPS_APIKEY,
  URL_TEMPLATE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA
} from '../../library/maps'
import {
  setInitMarkers,
  selectMarker,
  unselectMarker
} from '../../redux/actions/markerActions'
import ButtonMyLocation from '../../components/ButtonMyLocation/ButtonMyLocation'
import SearchBox from '../../components/SearchButton/SearchBox'
import MarkerView from './MarkerView'
import MiniView from './MiniView'
import { localData } from '../../library/localData'
import Footer from './Footer'
import MarkersContainer from './MarkersContainer'

function formatNumber(number) {
  return numeral(number).format('0[.]00000')
}

function compareCoordinate(coor1, coor2) {
  return (
    formatNumber(coor1.latitude) === formatNumber(coor2.latitude) &&
    formatNumber(coor1.longitude) === formatNumber(coor2.longitude)
  )
}

class MapScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      region: null,
      errorMessage: '',
      userCoordinate: null,
      centered: false
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
    this.props.init_marker(localData)
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
          const { userCoordinate } = this.state
          const { latitude, longitude } = loc.coords
          const newCoordinate = {
            latitude,
            longitude
          }
          if (!userCoordinate) {
            const userRegion = {
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }

            this.setState(
              {
                userCoordinate: new AnimatedRegion({
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0
                }),
                region: userRegion,
                centered: true
              },
              () => this.map.animateToRegion(userRegion)
            )
          } else {
            userCoordinate.timing(newCoordinate).start()
          }
        } else {
          this.setState({ errorMessage: 'Problems on update location' })
        }
      }
    )
  }

  _centerUserLocation = async () => {
    const { centered } = this.state
    if (!centered) {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        })
      }
      const loc = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = loc.coords
      const { region } = this.state
      const userRegion = { ...region, latitude, longitude }
      this.map.animateToRegion(userRegion)
      this.setState({ centered: true })
    }
  }

  _handleRegionChangeComplete = async region => {
    const { centered } = this.state
    if (centered) {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        })
      }
      const loc = await Location.getCurrentPositionAsync({})
      if (!compareCoordinate(loc.coords, region)) {
        this.setState({ centered: false })
      }
    }
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { item })
  }

  _renderUserLocation = () => {
    const { userCoordinate } = this.state
    if (userCoordinate) {
      return (
        <Marker.Animated
          ref={marker => {
            this.marker = marker
          }}
          coordinate={userCoordinate}
          image={images.user_location}
          onPress={this._centerUserLocation}
        />
      )
    }
  }

  _handleSearch = event => {
    const { text } = event.nativeEvent
    this.setState({ searchText: text.trim() })
  }
  _onMarkerPressed = (markerID, markerName) => {
    this.props.handleSelectMarker(markerID)
    this.setState({ searchText: markerName.trim() })
  }

  _onClosePressed = () => {
    this.props.handleUnselectMarker()
    this.setState({ searchText: '' })
  }

  _renderDirection = () => {
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
    const { searchText, region, errorMessage, centered } = this.state
    if (region) {
      return (
        <SafeAreaView style={styles.container}>
          <MapView
            style={styles.mapStyle}
            mapType="none"
            ref={ref => {
              this.map = ref
            }}
            onRegionChangeComplete={region =>
              this._handleRegionChangeComplete(region)
            }
            initialRegion={region}
            showsCompass={false}
            rotateEnabled={false}
          >
            <UrlTile urlTemplate={URL_TEMPLATE} maximumZ={19} zIndex={-1} />
            <MarkersContainer _onMarkerPressed={this._onMarkerPressed} />
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
              _onClosePressed={this._onClosePressed}
            />
          </View>
          <Footer
            centered={centered}
            _navigateToDetail={this._navigateToDetail}
            _centerUserLocation={this._centerUserLocation}
          />
        </SafeAreaView>
      )
    }

    return null
  }
}

const mapDispatchToProps = dispatch => ({
  init_marker: markers => {
    dispatch(setInitMarkers(markers))
  },
  handleSelectMarker: markerID => {
    dispatch(selectMarker(markerID))
  },
  handleUnselectMarker: () => {
    dispatch(unselectMarker())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(MapScreen)
