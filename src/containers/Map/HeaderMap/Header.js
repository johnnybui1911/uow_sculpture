import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import styles from './styles'
import { icons } from '../../../assets/icons'
import FormDirection from './FormDirection'
import { SearchBox, MidDivider } from '../../../components'
import { SCREEN_HEIGHT } from '../../../assets/dimension'
import { MapContext } from '../context/MapContext'
import SearchView from '../../../components/SearchButton/SearchView'

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
      distanceMatrix
    } = this.props

    const { header_translateY } = this.context

    if (!showSteps) {
      if (selectedMarker && showDirection) {
        const destination = selectedMarker.name
        return (
          <Animated.View
            style={[
              styles.formDirectionStyle,
              { transform: [{ translateY: header_translateY }] }
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
              <FormDirection destination={destination} />
              <TouchableWithoutFeedback>
                <View
                  style={{
                    padding: 12,
                    borderRadius: 50
                  }}
                >
                  {icons.exchange}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <MidDivider>
              <View style={styles.walkingBox}>
                {icons.walking}
                <Text style={styles.title_sm}>
                  {distanceMatrix && distanceMatrix[selectedMarker.id]
                    ? distanceMatrix[selectedMarker.id].duration
                    : ''}{' '}
                  min
                </Text>
              </View>
            </MidDivider>
          </Animated.View>
        )
      } else {
        return (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transform: [{ translateY: header_translateY }],
              zIndex: 1
            }}
          >
            <View style={[styles.searchBoxContainer]}>
              {this.props.children}
            </View>
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
