/* eslint-disable react/jsx-key */
import React from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { SwipeButton, ButtonMyLocation } from '../../../components'
import styles from '../styles'
import StepList from './StepList'
import MiniView from './MiniView'
import { SCREEN_WIDTH } from '../../../assets/dimension'

class Footer extends React.PureComponent {
  // onGestureEvent = Animated.event([
  //   {
  //     nativeEvent: { translationY: this._translateY }
  //   }
  // ])

  onGestureEvent = event => {
    if (
      event.nativeEvent.translationY >= 0 &&
      event.nativeEvent.translationY <= 100
    ) {
      Animated.timing(this._translateY, {
        toValue: 125,
        duration: 100
      }).start()
      // this._translateY.setValue(event.nativeEvent.translationY)
    } else if (event.nativeEvent.translationY < 0) {
      Animated.timing(this._translateY, {
        toValue: 0,
        duration: 100
      }).start()
    }
  }

  _translateY = new Animated.Value(0)

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

    // const animateScroll = this._translateY.interpolate({
    //   inputRange: [0, 100],
    //   outputRange: [0, 125],
    //   extrapolate: 'clamp'
    // })

    return (
      <PanGestureHandler onGestureEvent={this.onGestureEvent}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              // height: 300,
              bottom: 0,
              width: SCREEN_WIDTH
            },
            { transform: [{ translateY: this._translateY }] }
          ]}
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
        </Animated.View>
      </PanGestureHandler>
    )
  }

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
      <View style={[styles.mini_view_container]}>
        <View
          style={[
            styles.transparent_container,
            {
              justifyContent: 'flex-end',
              display: showSteps ? 'none' : 'flex'
            }
          ]}
        >
          <ButtonMyLocation
            centered={centered}
            _centerUserLocation={_centerUserLocation}
          />
        </View>
        <View
          style={[styles.showStepButton, { elevation: showSteps ? 10 : 9 }]}
        >
          {showSteps ? (
            <TouchableOpacity
              style={[
                styles.secondary_button,
                { marginVertical: 16, elevation: 0 }
              ]}
              onPress={() => _handleShowStep(false)}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.secondaryTitleButton]}>SHOW MAPS</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { marginVertical: 16, elevation: 0 }]}
              onPress={() => _handleShowStep(true)}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.titleButton]}>SHOW STEPS</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.stepsContainer}>
          <SwipeButton />
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 24,
              marginLeft: 24
            }}
          >
            <Text style={styles.minuteStyle}>
              {selectedMarker.duration} min
            </Text>
            <Text style={styles.distance_grey}>
              {` (${selectedMarker.distance})`}
            </Text>
          </View>
          {showSteps && <StepList steps={steps} />}
        </View>
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

    return this._renderLocationButton()
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(Footer)
