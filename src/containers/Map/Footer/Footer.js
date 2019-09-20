/* eslint-disable react/jsx-key */
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import BottomDrawer from '../../../library/rn-bottom-drawer/BottomDrawer'
import { SwipeButton, ButtonMyLocation } from '../../../components'
import styles from '../styles'
import StepList from './StepList'
import MiniView from './MiniView'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
  BOTTOM_TAB_BAR_HEIGHT,
  COLLAPSED_HEIGHT_STEPBOX,
  EXPANDED_HEIGHT_STEPBOX
} from '../../../assets/dimension'
import images from '../../../assets/images'
import { MapContext } from '../context/MapContext'
import formatDistance from '../../../library/formatDistance'
import palette from '../../../assets/palette'
import { selectMarker } from '../../../redux/actions'

const fakeMarker = {
  coordinate: {
    latitude: -34.4059,
    longitude: 150.8701
  },
  des: '',
  description: {
    creditLine:
      'Commissioned by the Friends of the University of Wollongong in celebration of the Australian Bicentenary, 1988',
    location:
      'Main campus, on UOW land on the western side of Robsons Road, Keiraville. Walking track entry from corner of Robsons Road and Northfields Avenue'
  },
  distance: '',
  duration: '',
  features: {
    date: '1988-1989',
    maker: 'Bert Flugelman',
    material: 'Stainless steel'
  },
  id: '1989.067',
  imageList: [
    {
      id: '033fe8c0-6d80-4f9a-8e22-f5ed97a12cc8',
      sculptureId: '1989.067',
      url:
        'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1989.067/IMG_2559.JPG'
    },
    {
      id: 'd7ceeaab-63e1-4a3d-929e-03fe2410ea85',
      sculptureId: '1989.067',
      url:
        'https://uowac-sculpture-images.s3.ap-southeast-2.amazonaws.com/1989.067/1568544178385-IMG_2565.JPG'
    },
    {
      id: '3c3ee488-15db-4aec-83e3-43f32fb1bab0',
      sculptureId: '1989.067',
      url:
        'https://uowac-sculpture-images.s3.ap-southeast-2.amazonaws.com/1989.067/1568544186206-2018-11-06%2009.45.45.jpg'
    },
    {
      id: '6d091a7e-a7a1-481f-bf76-a5269991b81b',
      sculptureId: '1989.067',
      url:
        'https://uowac-sculpture-images.s3.ap-southeast-2.amazonaws.com/1989.067/1568544192018-2018-11-06%2009.48.40.jpg'
    },
    {
      id: 'b0f3dbd9-c03e-4a5a-9a25-1b300c84d2af',
      sculptureId: '1989.067',
      url:
        'https://uowac-sculpture-images.s3.ap-southeast-2.amazonaws.com/1989.067/1568544192634-2018-11-06%2009.45.59.jpg'
    }
  ],
  name: 'Winged Figure',
  photoURL:
    'https://uowac-sculpture-images.s3-ap-southeast-2.amazonaws.com/1989.067/IMG_2559.JPG'
}

const fakeSteps = [
  {
    distance: {
      text: '0.1 km',
      value: 106
    },
    duration: {
      text: '1 min',
      value: 78
    },
    end_location: {
      lat: -34.4117182,
      lng: 150.8927918
    },
    html_instructions: 'Head <b>west</b> on <b>Exeter Ave</b>',
    polyline: {
      points: 'p``qEym~w[AD]hBAF?F?B@F@FRfA'
    },
    start_location: {
      lat: -34.4117659,
      lng: 150.8938938
    },
    travel_mode: 'WALKING'
  }
]

const MINI_IMAGE_POSITION = SCREEN_HEIGHT - 220 - 96
const LCOATION_BUTTON_POSITION = SCREEN_HEIGHT - 220 - 66
const ANIMATE_DURATION = 250

class Footer extends React.PureComponent {
  static contextType = MapContext
  static defaultProps = {
    steps: fakeSteps
  }

  miniImage_translateY = new Animated.Value(MINI_IMAGE_POSITION)
  locationButton_translateY = new Animated.Value(LCOATION_BUTTON_POSITION)

  slideIn = () => {
    Animated.parallel([
      Animated.timing(this.miniImage_translateY, {
        toValue: MINI_IMAGE_POSITION,
        duration: ANIMATE_DURATION
      }),
      Animated.timing(this.locationButton_translateY, {
        toValue: LCOATION_BUTTON_POSITION,
        duration: ANIMATE_DURATION
      })
    ]).start()
  }

  slideOut = () => {
    Animated.parallel([
      Animated.timing(this.miniImage_translateY, {
        toValue: SCREEN_HEIGHT,
        duration: ANIMATE_DURATION
      }),
      Animated.timing(this.locationButton_translateY, {
        toValue: SCREEN_HEIGHT,
        duration: ANIMATE_DURATION
      })
    ]).start()
  }

  _collapseStepList = () => {
    const { setShowSteps } = this.context
    setShowSteps(false)
    this.drawer.closeBottomDrawer()
  }

  componentDidMount = () => {
    const { animate } = this.context
    animate()
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.showSteps !== prevProps.showSteps ||
      this.props.showDirection !== prevProps.showDirection ||
      this.props.selectedMarker !== prevProps.selectedMarker
    ) {
      const { animate } = this.context
      animate()
    }
  }

  _renderLocationButton = () => {
    const { centered, _centerUserLocation } = this.props
    const { case1_footer_translateY } = this.context
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            right: 24,
            paddingBottom: 12,
            bottom: case1_footer_translateY
          }
        ]}
      >
        <ButtonMyLocation
          centered={centered}
          _centerUserLocation={_centerUserLocation}
        />
      </Animated.View>
    )
  }

  // FIXME: fix bottom drawer
  _renderMarkerFooter = () => {
    const { centered, _centerUserLocation, selectedMarker } = this.props
    const { footer_translateY } = this.context
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate('Detail', {
              id: selectedMarker.id,
              goBackMap: true
            })
          }
        >
          <Animated.View
            style={[
              styles.mini_image_container,
              {
                position: 'absolute',
                top: this.miniImage_translateY,
                left: 24,
                zIndex: 0,
                transform: [{ translateY: footer_translateY }]
              }
            ]}
          >
            {selectedMarker.photoURL ? (
              <Image
                source={{ uri: selectedMarker.photoURL }}
                style={styles.image}
              />
            ) : (
              <View
                style={[
                  {
                    flex: 1,
                    width: 80,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: palette.backgroundTabColor,
                    borderRadius: 12
                  }
                ]}
              >
                <Image
                  source={images.empty_image}
                  style={[
                    styles.image,
                    { width: 80, height: 50, backgroundColor: '#F6F6F6' }
                  ]}
                  resizeMode="cover"
                />
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: this.locationButton_translateY,
              right: 24,
              zIndex: 0,
              transform: [{ translateY: footer_translateY }]
            }
          ]}
        >
          <ButtonMyLocation
            centered={centered}
            _centerUserLocation={_centerUserLocation}
          />
        </Animated.View>
        <BottomDrawer
          _translateY={footer_translateY}
          autoAnimate
          containerHeight={220}
          downDisplay={220 - 72}
          backgroundColor="#fff"
          onCollapsed={() => {
            this.slideOut()
          }}
          onExpanded={() => {
            this.slideIn()
          }}
        >
          <MiniView />
        </BottomDrawer>
      </View>
    )
  }

  drawer = null

  _renderDirectionFooter = () => {
    const {
      centered,
      _centerUserLocation,
      selectedMarker,
      steps,
      showSteps,
      distanceMatrix
    } = this.props
    const { setShowSteps, footer_translateY } = this.context
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: footer_translateY
        }}
      >
        <View
          style={[
            {
              bottom: COLLAPSED_HEIGHT_STEPBOX + 12,
              position: 'absolute',
              right: 24,
              zIndex: 0
            }
          ]}
        >
          <ButtonMyLocation
            centered={centered}
            _centerUserLocation={_centerUserLocation}
          />
        </View>
        <View
          style={[styles.showStepButton, { elevation: showSteps ? 20 : 0 }]}
        >
          <TouchableOpacity
            style={[
              showSteps ? styles.secondary_button : styles.button,
              { marginVertical: 16, elevation: 0 }
            ]}
            onPress={() => {
              setShowSteps(!showSteps)
              this.drawer.toggleDrawerState()
            }}
          >
            <View style={{ flex: 1 }}>
              {showSteps ? (
                <Text style={[styles.secondaryTitleButton]}>SHOW MAPS</Text>
              ) : (
                <Text style={[styles.titleButton]}>SHOW STEPS</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <BottomDrawer
          style={{ position: 'relative' }}
          containerHeight={EXPANDED_HEIGHT_STEPBOX}
          downDisplay={EXPANDED_HEIGHT_STEPBOX - COLLAPSED_HEIGHT_STEPBOX + 5}
          backgroundColor="transparent"
          startUp={false}
          roundedEdges={false}
          onExpanded={() => {
            setShowSteps(true)
          }}
          onCollapsed={() => {
            setShowSteps(false)
          }}
          ref={ref => (this.drawer = ref)}
        >
          <View
            style={{ height: EXPANDED_HEIGHT_STEPBOX, zIndex: 1, elevation: 9 }}
          >
            <View style={styles.stepsContainer}>
              <SwipeButton />
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  height: 50 //75
                }}
              >
                <Text style={styles.minuteStyle}>
                  {distanceMatrix[selectedMarker.id]
                    ? distanceMatrix[selectedMarker.id].duration + ' min '
                    : ''}
                </Text>
                <Text style={styles.distance_grey}>
                  (
                  {distanceMatrix[selectedMarker.id]
                    ? formatDistance(distanceMatrix[selectedMarker.id].distance)
                    : ''}
                  )
                </Text>
              </View>
              <StepList steps={steps} />
            </View>
          </View>
        </BottomDrawer>
      </Animated.View>
    )
  }

  render() {
    const { selectedMarker, showDirection } = this.props
    if (selectedMarker) {
      return showDirection
        ? this._renderDirectionFooter()
        : this._renderMarkerFooter()
    }

    return this._renderLocationButton()
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker,
  distanceMatrix: getState.distanceReducer.distanceMatrix
})

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(withNavigation(Footer))
