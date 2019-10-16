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
  EXPANDED_HEIGHT_STEPBOX,
  MARGIN_BOTTOM_STEPBOX,
  NAVIGATION_BAR_HEIGHT
} from '../../../assets/dimension'
import images from '../../../assets/images'
import { MapContext } from '../context/MapContext'
import formatDistance from '../../../library/formatDistance'
import palette from '../../../assets/palette'
import { selectMarker } from '../../../redux/actions'

const MINI_IMAGE_POSITION = SCREEN_HEIGHT - 220 - 96 - NAVIGATION_BAR_HEIGHT
const LCOATION_BUTTON_POSITION =
  SCREEN_HEIGHT - 220 - 66 - NAVIGATION_BAR_HEIGHT
const ANIMATE_DURATION = 250

class Footer extends React.PureComponent {
  static contextType = MapContext

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
    console.log('Collapsed')
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
          offset={NAVIGATION_BAR_HEIGHT}
          _translateY={footer_translateY}
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
          <MiniView _navigateToDetail={this.props._navigateToDetail} />
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
    const {
      setShowSteps,
      footer_translateY,
      direction_state,
      header_translateY
    } = this.context
    return (
      <React.Fragment>
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: 76,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9,
              transform: [{ translateY: footer_translateY }]
            }
          ]}
        >
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
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: MARGIN_BOTTOM_STEPBOX + 12,
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
          containerHeight={EXPANDED_HEIGHT_STEPBOX}
          downDisplay={
            EXPANDED_HEIGHT_STEPBOX -
            COLLAPSED_HEIGHT_STEPBOX -
            NAVIGATION_BAR_HEIGHT
          }
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
                  {`${direction_state.duration} min `}
                </Text>
                <Text style={styles.distance_grey}>
                  ({formatDistance(direction_state.distance)})
                </Text>
              </View>
              <StepList steps={steps} />
            </View>
          </View>
        </BottomDrawer>
      </React.Fragment>
    )
  }

  render() {
    const { selectedMarker, showDirection } = this.props
    // if (selectedMarker) {
    //   return showDirection
    //     ? this._renderDirectionFooter()
    //     : this._renderMarkerFooter()
    // }

    return this._renderMarkerFooter()
  }
}

// const mapStateToProps = getState => ({
//   selectedMarker: getState.markerReducer.selectedMarker,
//   distanceMatrix: getState.distanceReducer.distanceMatrix
// })

const mapStateToProps = getState => {
  const { distanceMatrix } = getState.distanceReducer
  const { markerMatrix } = getState.markerReducer
  const selectedMarker = markerMatrix['1986.058']
  return {
    selectedMarker,
    distanceMatrix
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(Footer)
