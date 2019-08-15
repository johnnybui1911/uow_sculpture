import React from 'react'
import { View, TextInput, TouchableWithoutFeedback, Text } from 'react-native'
import SearchBox from '../../components/SearchButton/SearchBox'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'
import MidDivider from '../../components/MidDivider/MidDivider'

class Header extends React.PureComponent {
  _goBack = () => {
    this.props._handleShowDirection(false)
  }

  render() {
    const {
      showSteps,
      searchText,
      showDirection,
      _handleSearch,
      _onClosePressed,
      _handleShowDirection
    } = this.props

    if (showDirection) {
      if (!showSteps) {
        return (
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              elevation: 4,
              width: '100%',
              // maxHeight: 171,
              top: 0,
              paddingTop: STATUS_BAR_HEIGHT + 12,
              zIndex: 1000,
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  height: '100%',
                  marginHorizontal: 12,
                  marginTop: 8
                }}
              >
                <TouchableWithoutFeedback onPress={this._goBack}>
                  <View
                    style={{
                      paddingVertical: 4,
                      borderRadius: 50
                    }}
                  >
                    {icons.back_blue}
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginHorizontal: 8
                }}
              >
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  {icons.user_location_sm}
                  <View style={{ marginVertical: 1.5 }}>
                    {icons.vertical_dots}
                  </View>
                  {icons.marker_sm}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.inputBox}>
                    <TextInput
                      value="Your location"
                      // onChangeText={email => this.setState({ email })}
                      placeholder="Origin"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput
                      // value="Origin"
                      // onChangeText={email => this.setState({ email })}
                      placeholder="Destination"
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>
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
                <Text style={styles.title_sm}>5 min</Text>
              </View>
            </MidDivider>
          </View>
        )
      }
      return null
    }
    return (
      <View
        style={{
          marginTop: STATUS_BAR_HEIGHT,
          zIndex: 1000
        }}
      >
        <SearchBox
          _handleSearch={_handleSearch}
          searchText={searchText}
          _onClosePressed={_onClosePressed}
        />
      </View>
    )
  }
}

export default Header
