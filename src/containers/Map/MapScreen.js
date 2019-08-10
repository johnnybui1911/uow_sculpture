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

function formatNumber(number) {
  return numeral(number).format('0[.]00000')
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
      const { latitude, longitude } = loc.coords
      if (
        formatNumber(latitude) !== formatNumber(region.latitude) ||
        formatNumber(longitude) !== formatNumber(region.longitude)
      ) {
        this.setState({ centered: false })
      }
    }
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { item })
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

  _renderMarker = () => {
    const { markerState } = this.props
    if (markerState.markers.length > 0) {
      const { markers, selected } = markerState
      return (
        <React.Fragment>
          {markers.map(marker => (
            <MarkerView
              key={marker.id}
              marker={marker}
              pressed={marker.pressed}
              selected={selected}
              _onMarkerPressed={this._onMarkerPressed}
            />
          ))}
        </React.Fragment>
      )
    }
  }

  _renderMiniView = () => {
    const { selected_id } = this.props.markerState
    if (selected_id) {
      const selected_marker = localData.find(data => data.id === selected_id)
      return (
        <MiniView
          marker={selected_marker}
          _centerUserLocation={this._centerUserLocation}
          _navigateToDetail={this._navigateToDetail}
        >
          <ButtonMyLocation
            centered={this.state.centered}
            _centerUserLocation={this._centerUserLocation}
          />
        </MiniView>
      )
    }

    return (
      <View
        style={[
          styles.mini_view_container,
          { alignItems: 'flex-end', paddingHorizontal: 24, paddingBottom: 12 }
        ]}
      >
        <ButtonMyLocation
          centered={this.state.centered}
          _centerUserLocation={this._centerUserLocation}
        />
      </View>
    )
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

  _handleSearch = event => {
    const { text } = event.nativeEvent
    this.setState({ searchText: text.trim() })
  }
  _onMarkerPressed = (markerID, markerName) => {
    this.props.handleSelectMarker(markerID)
    this.setState({ searchText: markerName.trim() })
  }

  _onMarkerUnPressed = () => {
    this.props.handleUnselectMarker()
    this.setState({ searchText: '' })
  }

  render() {
    const { searchText, region, errorMessage } = this.state
    const { selected } = this.props.markerState

    if (region) {
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
              markerSelected={selected}
              _onMarkerUnPressed={this._onMarkerUnPressed}
            />
          </View>
          {this._renderMiniView()}
        </SafeAreaView>
      )
    }

    return null
  }
}

const mapStateToProps = getState => ({
  markerState: getState.markerReducer
})

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
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
