import React from 'react'
import {
  SafeAreaView,
  View,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native'
import MapView, { UrlTile, Marker, AnimatedRegion } from 'react-native-maps'
import Modal from 'react-native-modal'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { connect } from 'react-redux'
import numeral from 'numeral'
import haversine from 'haversine-distance'
import styles from './styles'
import images from '../../assets/images'
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  URL_TEMPLATE,
  LATITUDE,
  LONGITUDE,
  USER_LATITUDE,
  USER_LONGITUDE,
  DEFAULT_PADDING
} from '../../library/maps'
import {
  selectMarker,
  unselectMarker,
  fetchDataThunk
} from '../../redux/actions/markerActions'
import Footer from './Footer'
import MarkersContainer from './MarkersContainer'
import Direction from './Direction'
import Header from './HeaderMap/Header'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'
import { getData } from '../../library/asyncStorage'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from '../../assets/dimension'

function formatNumber(number) {
  return numeral(number).format('0[.]00000')
}

function compareCoordinate(coor1, coor2) {
  return (
    formatNumber(coor1.latitude) === formatNumber(coor2.latitude) &&
    formatNumber(coor1.longitude) === formatNumber(coor2.longitude)
  )
}

const calcDistance = (latLng1, latLng2) => {
  return Math.floor(haversine(latLng1, latLng2)) || 0
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
      showMapOnly: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      steps: [],
      showSteps: false,
      centered: false,
      showDirection: false,
      searchText: '',
      errorMessage: '',

      // loading fetch data
      isDataLoading: true,
      // modalState
      isModalVisible: false
    }
  }

  componentWillMount = () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      // this._getLocationAsync()
    }
  }

  componentDidMount = () => {
    this.props.fetchDataThunk(this.userCoordinate.__getValue())
  }

  componentWillUnmount = () => {
    // this.subscribeLocation()
  }

  userCoordinate = new AnimatedRegion({
    latitude: USER_LATITUDE,
    longitude: USER_LONGITUDE,
    latitudeDelta: 0,
    longitudeDelta: 0
  })

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
        distanceInterval: 10
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

  _resetUI = () => {
    this.setState({
      steps: [],
      showSteps: false,
      centered: false,
      showDirection: false,
      searchText: '',
      isModalVisible: false
    })

    this._centerUserLocation()
    this._onClosePressed()
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
          style={{ zIndex: 2 }}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={this.userCoordinate}
          image={images.user_location}
          onPress={this._centerUserLocation}
          draggable
          onDragEnd={e => {
            const userLocation = e.nativeEvent.coordinate

            const travelDistance = calcDistance(
              userLocation,
              this.userCoordinate.__getValue()
            )

            this.userCoordinate.setValue({
              ...userLocation,
              latitudeDelta: 0,
              longitudeDelta: 0
            })

            travelDistance >= 10 && this.props.fetchDataThunk(userLocation) // each 10m, sync position again to fecth data
            // .then(res => console.log(res))

            if (this.props.selectedMarker) {
              const distance = calcDistance(
                e.nativeEvent.coordinate,
                this.props.selectedMarker.coordinate
              )

              if (distance <= 20) {
                this._sendPushNotification()
                this.setState({ isModalVisible: true })
              }
            }
          }}
        />
      )
    }
  }

  // TODO:
  // sendPushNotification
  _sendPushNotification = () => {
    getData('token')
      .then(async token => {
        console.log(token)
        const message = {
          to: token,
          sound: 'default',
          title: 'Congratulation',
          body: 'You have finished your trip !!!',
          _displayInForeground: true
        }

        await fetch('https://exp.host/--/api/v2/push/send', {
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

  /////////////////////

  _handleSearch = event => {
    const { text } = event.nativeEvent
    this.setState({ searchText: text.trim() })
  }
  _onMarkerPressed = (markerID, markerName) => {
    if (
      (!this.props.selectedMarker ||
        this.props.selectedMarker.id !== markerID) &&
      !this.state.showDirection
    ) {
      if (this.props.navigation.getParam('showTab', true)) {
        this.props.navigation.setParams({ showTab: false })
      }
      this.props.handleSelectMarker(markerID)
      this.setState({ searchText: markerName.trim(), showMapOnly: false })
    }
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

  _fitToCoordinate = coordinates => {
    this.map.fitToCoordinates(coordinates, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    })
  }

  toggleShowMapOnly = () => {
    this.setState(prevState => ({
      showMapOnly: !prevState.showMapOnly
    }))

    if (!this.props.selectedMarker) {
      const showTab = this.props.navigation.getParam('showTab', true)
      this.props.navigation.setParams({ showTab: !showTab })
    }
  }

  render() {
    const {
      showMapOnly,
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
          {!showMapOnly && (
            <Header
              showSteps={showSteps}
              searchText={searchText}
              showDirection={showDirection}
              _handleSearch={this._handleSearch}
              _onClosePressed={this._onClosePressed}
              _handleShowDirection={this._handleShowDirection}
            />
          )}
          <MapView
            style={styles.mapStyle}
            ref={ref => {
              this.map = ref
            }}
            onPress={this.toggleShowMapOnly}
            onRegionChangeComplete={region =>
              this._handleRegionChangeComplete(region)
            }
            initialRegion={region}
            showsCompass={false}
            moveOnMarkerPress={false}
          >
            <UrlTile urlTemplate={URL_TEMPLATE} maximumZ={19} zIndex={-1} />
            {this._renderUserLocation()}
            <MarkersContainer _onMarkerPressed={this._onMarkerPressed} />
            <Direction
              userCoordinate={this.userCoordinate}
              showDirection={showDirection}
              _getSteps={this._getSteps}
              _handleDirectionState={this._handleDirectionState}
              _fitToCoordinate={this._fitToCoordinate}
            />
          </MapView>
          {!showMapOnly && (
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
          )}
          <View
            style={{
              position: 'absolute',
              height: STATUS_BAR_HEIGHT,
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: '#000000',
              zIndex: 100,
              opacity: 0.5,
              display: this.state.isModalVisible ? 'flex' : 'none'
            }}
          />
          <Modal
            isVisible={this.state.isModalVisible}
            animationIn="zoomInDown"
            animationInTiming={1000}
            onSwipeComplete={() => this._resetUI()}
            swipeDirection={['up', 'left', 'right', 'down']}
            onBackdropPress={() => this._resetUI()}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 26,
                height: 200,
                width: 240,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 10
              }}
            >
              <View style={{ position: 'absolute', top: -55 }}>
                {icons.trophy}
              </View>
              <View
                style={{
                  marginTop: 30,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={[styles.title, { fontSize: 20 }]}>
                  Congratulation
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 44,
                  borderRadius: 26,
                  width: 140,
                  backgroundColor: palette.primaryColorLight,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                  zIndex: 10
                }}
                onPress={() => this._resetUI()}
              >
                <Text style={styles.titleButton}>PROCEED</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </SafeAreaView>
      )
    }

    return null
  }
}

const mapDispatchToProps = dispatch => ({
  handleSelectMarker: markerID => {
    dispatch(selectMarker(markerID))
  },
  handleUnselectMarker: () => {
    dispatch(unselectMarker())
  },
  fetchDataThunk: userCoordinate => {
    return dispatch(fetchDataThunk(userCoordinate))
  }
})

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen)
