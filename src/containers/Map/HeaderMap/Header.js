import React from 'react'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import { connect } from 'react-redux'
import SearchBox from '../../../components/SearchButton/SearchBox'
import styles from './styles'
import { icons } from '../../../assets/icons'
import MidDivider from '../../../components/MidDivider/MidDivider'
import FormDirection from './FormDirection'

class Header extends React.PureComponent {
  _goBack = () => {
    this.props._handleShowDirection(false)
  }

  render() {
    const {
      showSteps,
      searchText,
      showDirection,
      selectedMarker,
      _handleSearch,
      _onClosePressed,
      _handleShowDirection
    } = this.props

    if (showDirection) {
      if (!showSteps) {
        const destination = selectedMarker.name
        return (
          <View style={styles.formDirectionStyle}>
            <View style={styles.rowStyle}>
              <View style={styles.backButtonContainerStyle}>
                <TouchableWithoutFeedback onPress={this._goBack}>
                  <View style={styles.backButtonStyle}>{icons.back_blue}</View>
                </TouchableWithoutFeedback>
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
                  {selectedMarker.duration} min
                </Text>
              </View>
            </MidDivider>
          </View>
        )
      }
      return null
    }
    return (
      <View style={styles.searchBoxContainer}>
        <SearchBox
          _handleSearch={_handleSearch}
          searchText={searchText}
          _onClosePressed={_onClosePressed}
        />
      </View>
    )
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(Header)
