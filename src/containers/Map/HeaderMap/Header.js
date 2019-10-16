import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Animated,
  TouchableOpacity,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { icons } from '../../../assets/icons'
import FormDirection from './FormDirection'
import { SearchBox, MidDivider } from '../../../components'
import {
  SCREEN_HEIGHT,
  HEADER_BAR_MARGIN_TOP,
  STATUS_BAR_HEIGHT
} from '../../../assets/dimension'
import { MapContext } from '../context/MapContext'
import SearchView from '../../../components/SearchButton/SearchView'
import { SafeAreaConsumer } from 'react-native-safe-area-view'

class Header extends React.Component {
  static contextType = MapContext

  // FIXME: DUPLICATE WITH FOOTER
  componentDidMount = () => {
    const { animate } = this.context
    animate()
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.showSteps !== prevProps.showSteps ||
      this.props.showDirection !== prevProps.showDirection ||
      this.props.selectedMarker !== prevProps.selectedMarker ||
      this.props.showMapOnly !== prevProps.showMapOnly
    ) {
      const { animate, animateHide } = this.context
      if (this.props.showMapOnly) {
        animateHide()
      } else {
        animate()
      }
    }
  }

  _goBack = () => {
    const { setShowDirection } = this.context
    setShowDirection(false)
  }

  switchView = () => {
    Animated.timing(this.state._translateY, {
      toValue: -500,
      duration: 400
    }).start(() => {
      this.props._handleShowDirection(false)
    })
  }

  render() {
    const {
      searchText,
      selectedMarker,
      _handleSearch,
      _onClosePressed,
      showSteps,
      showDirection,
      distanceMatrix,
      _onMarkerPressed
    } = this.props

    const { header_translateY, direction_state } = this.context

    if (!showSteps) {
      if (selectedMarker && showDirection) {
        const destination = selectedMarker.name
        return (
          <SafeAreaConsumer>
            {insets => {
              const FIX_NOTCH_HEADER = insets.top > 20 ? insets.top - 20 : 0
              return (
                <Animated.View
                  style={[
                    styles.formDirectionStyle,
                    { transform: [{ translateY: header_translateY }] },
                    {
                      paddingTop:
                        Platform.OS === 'ios'
                          ? HEADER_BAR_MARGIN_TOP +
                            STATUS_BAR_HEIGHT +
                            FIX_NOTCH_HEADER
                          : HEADER_BAR_MARGIN_TOP
                    }
                  ]}
                >
                  <View style={styles.rowStyle}>
                    <View style={styles.backButtonContainerStyle}>
                      <TouchableOpacity
                        style={[styles.backButtonStyle]}
                        onPress={() => this._goBack()}
                      >
                        <View>{icons.back_blue({})}</View>
                      </TouchableOpacity>
                    </View>
                    <FormDirection
                      destination={destination}
                      searchText={searchText}
                      _onMarkerPressed={_onMarkerPressed}
                    />
                  </View>
                  <MidDivider>
                    <View style={styles.walkingBox}>
                      {icons.walking}
                      <Text style={styles.title_sm}>
                        {`${direction_state.duration} min`}
                      </Text>
                    </View>
                  </MidDivider>
                </Animated.View>
              )
            }}
          </SafeAreaConsumer>
        )
      } else {
        return (
          <Animated.View
            style={[
              styles.searchBoxAbsoluteStyle,
              {
                transform: [{ translateY: header_translateY }]
              }
            ]}
          >
            <SafeAreaConsumer>
              {insets => {
                const FIX_NOTCH_HEADER = insets.top > 20 ? insets.top - 20 : 0
                return (
                  <View
                    style={[
                      styles.searchBoxContainer,
                      { paddingTop: FIX_NOTCH_HEADER }
                    ]}
                  >
                    {this.props.children}
                  </View>
                )
              }}
            </SafeAreaConsumer>
          </Animated.View>
        )
      }
    }
    return null
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker,
  distanceMatrix: getState.distanceReducer.distanceMatrix
})

export default connect(mapStateToProps)(Header)
