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
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  URL_TEMPLATE
} from '../../library/maps'
import {
  setInitMarkers,
  selectMarker,
  unselectMarker
} from '../../redux/actions/markerActions'
import SearchBox from '../../components/SearchButton/SearchBox'
import { localData } from '../../library/localData'
import Footer from './Footer'
import MarkersContainer from './MarkersContainer'
import Direction from './Direction'
import Header from './Header'

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
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: navigation.getParam('showTab', true)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: -34.4114455,
        longitude: 150.8939863,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      steps: [],
      showSteps: false,
      centered: false,
      showDirection: false,
      searchText: '',
      errorMessage: ''
    }
  }

  componentWillMount = () => {
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

  userCoordinate = null

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
          const { latitude, longitude } = loc.coords
          if (!this.userCoordinate) {
            this.userCoordinate = new AnimatedRegion({
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0,
              longitudeDelta: 0
            })
            const userRegion = {
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
            this.setState(
              {
                region: userRegion,
                centered: true
              },
              () => this.map.animateToRegion(userRegion)
            )
          } else {
            const duration = 500
            this.userCoordinate
              .timing({ latitude, longitude, duration })
              .start()
          }
        } else {
          this.setState({ errorMessage: 'Problems on update location' })
        }
      }
    )
  }

  _centerUserLocation = () => {
    const { centered } = this.state
    if (!centered) {
      const { region } = this.state
      if (this.userCoordinate) {
        const loc = this.userCoordinate.__getValue()
        const { latitude, longitude } = loc
        const userRegion = { ...region, latitude, longitude }
        this.map.animateToRegion(userRegion)
        this.setState({ centered: true })
      }
    }
  }

  _handleRegionChangeComplete = region => {
    const { centered } = this.state
    if (centered) {
      if (this.userCoordinate) {
        const loc = this.userCoordinate.__getValue()
        if (!compareCoordinate(loc, region)) {
          this.setState({ centered: false })
        }
      }
    }
  }

  _navigateToDetail = item => {
    this.props.navigation.navigate('Detail', { item })
  }

  _renderUserLocation = () => {
    if (this.userCoordinate) {
      return (
        <Marker.Animated
          ref={marker => {
            this.marker = marker
          }}
          coordinate={this.userCoordinate}
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
    if (this.props.navigation.getParam('showTab', true)) {
      this.props.navigation.setParams({ showTab: false })
    }
    this.props.handleSelectMarker(markerID)
    this.setState({ searchText: markerName.trim() })
  }

  _onClosePressed = () => {
    this.props.navigation.setParams({ showTab: true })
    this.props.handleUnselectMarker()
    this.setState({ searchText: '', showDirection: false })
  }

  _handleShowDirection = showDirection => {
    this.setState({ showDirection })
  }

  _getSteps = steps => {
    this.setState({ steps })
  }

  _handleShowStep = showSteps => {
    this.setState({ showSteps })
  }

  render() {
    const {
      searchText,
      region,
      showDirection,
      centered,
      steps,
      showSteps
    } = this.state
    if (region) {
      return (
        <SafeAreaView style={styles.container}>
          <Header
            showSteps={showSteps}
            searchText={searchText}
            showDirection={showDirection}
            _handleSearch={this._handleSearch}
            _onClosePressed={this._onClosePressed}
            _handleShowDirection={this._handleShowDirection}
          />
          <MapView
            style={styles.mapStyle}
            // mapType="none"
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
            <Direction
              userCoordinate={this.userCoordinate}
              showDirection={showDirection}
              _getSteps={this._getSteps}
            />
          </MapView>
          <Footer
            showSteps={showSteps}
            steps={steps}
            centered={centered}
            showDirection={showDirection}
            _handleShowStep={this._handleShowStep}
            _navigateToDetail={this._navigateToDetail}
            _centerUserLocation={this._centerUserLocation}
            _handleShowDirection={this._handleShowDirection}
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

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
