/* eslint-disable react/jsx-key */
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import { connect } from 'react-redux'
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

const fakeMarker = {
  id: 1,
  name: 'Winged Figure',
  distance: 500,
  duration: 5,
  des: 'Western side of Robsons Road',
  features: {
    date: '1988-1989',
    maker: 'Bert Flugelman',
    material: 'Stainless steel'
  },
  description: {
    location:
      'Main campus, on UOW land on the western side of  Robsons Road, Keiraville. Walking track entry from corner of Robsons Road and  Northfields Avenue',
    creditLine:
      'Commissioned by the Friends of the University of Wollongong in celebration of the Australian Bicentenary, 1988'
  },
  photoURL: 1,
  coordinate: {
    latitude: -34.40478,
    longitude: 150.88115
  }
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
  },
  {
    distance: {
      text: '62 m',
      value: 62
    },
    duration: {
      text: '1 min',
      value: 47
    },
    end_location: {
      lat: -34.4122518,
      lng: 150.8927059
    },
    html_instructions: 'Turn <b>left</b> toward <b>Station St</b>',
    maneuver: 'turn-left',
    polyline: {
      points: 'f``qE}f~w[f@GLBB@FBDDFBBBD@D?HA'
    },
    start_location: {
      lat: -34.4117182,
      lng: 150.8927918
    },
    travel_mode: 'WALKING'
  },
  {
    distance: {
      text: '62 m',
      value: 62
    },
    duration: {
      text: '1 min',
      value: 47
    },
    end_location: {
      lat: -34.4122518,
      lng: 150.8927059
    },
    html_instructions: 'Turn <b>left</b> toward <b>Station St</b>',
    maneuver: 'turn-left',
    polyline: {
      points: 'f``qE}f~w[f@GLBB@FBDDFBBBD@D?HA'
    },
    start_location: {
      lat: -34.4117182,
      lng: 150.8927918
    },
    travel_mode: 'WALKING'
  },
  {
    distance: {
      text: '62 m',
      value: 62
    },
    duration: {
      text: '1 min',
      value: 47
    },
    end_location: {
      lat: -34.4122518,
      lng: 150.8927059
    },
    html_instructions: 'Turn <b>left</b> toward <b>Station St</b>',
    maneuver: 'turn-left',
    polyline: {
      points: 'f``qE}f~w[f@GLBB@FBDDFBBBD@D?HA'
    },
    start_location: {
      lat: -34.4117182,
      lng: 150.8927918
    },
    travel_mode: 'WALKING'
  },
  {
    distance: {
      text: '62 m',
      value: 62
    },
    duration: {
      text: '1 min',
      value: 47
    },
    end_location: {
      lat: -34.4122518,
      lng: 150.8927059
    },
    html_instructions: 'Turn <b>left</b> toward <b>Station St</b>',
    maneuver: 'turn-left',
    polyline: {
      points: 'f``qE}f~w[f@GLBB@FBDDFBBBD@D?HA'
    },
    start_location: {
      lat: -34.4117182,
      lng: 150.8927918
    },
    travel_mode: 'WALKING'
  },
  {
    distance: {
      text: '62 m',
      value: 62
    },
    duration: {
      text: '1 min',
      value: 47
    },
    end_location: {
      lat: -34.4122518,
      lng: 150.8927059
    },
    html_instructions: 'Turn <b>left</b> toward <b>Station St</b>',
    maneuver: 'turn-left',
    polyline: {
      points: 'f``qE}f~w[f@GLBB@FBDDFBBBD@D?HA'
    },
    start_location: {
      lat: -34.4117182,
      lng: 150.8927918
    },
    travel_mode: 'WALKING'
  },
  {
    distance: {
      text: '62 m',
      value: 62
    },
    duration: {
      text: '1 min',
      value: 47
    },
    end_location: {
      lat: -34.4122518,
      lng: 150.8927059
    },
    html_instructions: 'Turn <b>left</b> toward <b>Station St</b>',
    maneuver: 'turn-left',
    polyline: {
      points: 'f``qE}f~w[f@GLBB@FBDDFBBBD@D?HA'
    },
    start_location: {
      lat: -34.4117182,
      lng: 150.8927918
    },
    travel_mode: 'WALKING'
  }
]

class Footer extends React.PureComponent {
  static defaultProps = {
    steps: fakeSteps
  }

  state = {
    _translateY: new Animated.Value(0)
  }

  _renderLocationButton = () => {
    const { centered, _centerUserLocation } = this.props
    return (
      <View
        style={[
          styles.mini_view_container,
          { alignItems: 'flex-end', paddingHorizontal: 24, paddingBottom: 12 }
        ]}
      >
        <ButtonMyLocation
          centered={centered}
          _centerUserLocation={_centerUserLocation}
        />
      </View>
    )
  }

  _renderMarkerFooter = () => {
    const {
      selectedMarker,
      _navigateToDetail,
      _handleShowDirection,
      centered,
      _centerUserLocation
    } = this.props

    return (
      <BottomDrawer
        containerHeight={220 + 96}
        downDisplay={220 - 118}
        backgroundColor="transparent"
        roundedEdges={false}
      >
        <MiniView
          marker={selectedMarker}
          _navigateToDetail={_navigateToDetail}
          _handleShowDirection={_handleShowDirection}
        >
          <ButtonMyLocation
            centered={centered}
            _centerUserLocation={_centerUserLocation}
          />
        </MiniView>
      </BottomDrawer>
    )
  }

  drawer = null

  _renderDirectionFooter = () => {
    const {
      centered,
      _centerUserLocation,
      showSteps,
      _handleShowStep,
      selectedMarker,
      steps
    } = this.props

    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
          style={[styles.showStepButton, { elevation: showSteps ? 12 : 0 }]}
        >
          <TouchableOpacity
            style={[
              showSteps ? styles.secondary_button : styles.button,
              { marginVertical: 16, elevation: 0 }
            ]}
            onPress={() => {
              _handleShowStep(!showSteps)
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
          containerHeight={EXPANDED_HEIGHT_STEPBOX}
          downDisplay={EXPANDED_HEIGHT_STEPBOX - COLLAPSED_HEIGHT_STEPBOX}
          backgroundColor="transparent"
          startUp={false}
          roundedEdges={false}
          onExpanded={() => {
            const { currentState } = this.drawer.state
            _handleShowStep(currentState === 1 ? true : false)
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
                  paddingVertical: 24,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  height: 75
                }}
              >
                <Text style={styles.minuteStyle}>
                  {fakeMarker.duration} min
                </Text>
                <Text style={styles.distance_grey}>
                  {` (${fakeMarker.distance})`}
                </Text>
              </View>
              <StepList steps={steps} />
            </View>
          </View>
        </BottomDrawer>
      </View>
    )
  }

  render() {
    const { selectedMarker, showDirection } = this.props

    if (selectedMarker) {
      if (showDirection) {
        return this._renderDirectionFooter()
      }
      return this._renderMarkerFooter()
    }

    return this._renderDirectionFooter()
    // return this._renderLocationButton()
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(Footer)
