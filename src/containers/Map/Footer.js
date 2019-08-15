/* eslint-disable react/jsx-key */
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import MiniView from './MiniView'
import ButtonMyLocation from '../../components/ButtonMyLocation/ButtonMyLocation'
import styles from './styles'
import SwipeButton from '../../components/SwipeButton/SwipeButton'
import StepList from './StepList'

class Footer extends React.PureComponent {
  render() {
    const {
      steps,
      selectedMarker,
      centered,
      showDirection,
      _navigateToDetail,
      _centerUserLocation,
      _handleShowDirection,
      _handleShowStep,
      showSteps
    } = this.props

    if (selectedMarker) {
      if (showDirection) {
        return (
          <View style={[styles.mini_view_container]}>
            <View
              style={[
                styles.mini_view_container,
                {
                  alignItems: 'flex-end',
                  paddingHorizontal: 24,
                  paddingBottom: 12
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
              <View style={{ flexDirection: 'row', marginVertical: 24 }}>
                <Text style={styles.minuteStyle}>5 min</Text>
                <Text style={styles.distance_grey}>{` (200 m)`}</Text>
              </View>
              {showSteps && <StepList steps={steps} />}
            </View>
          </View>
        )
      }
      return (
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
          centered={centered}
          _centerUserLocation={_centerUserLocation}
        />
      </View>
    )
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(Footer)
