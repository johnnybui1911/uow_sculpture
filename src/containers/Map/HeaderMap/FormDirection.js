import React from 'react'
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native'
import { withNavigation } from 'react-navigation'
import styles from './styles'
import { icons } from '../../../assets/icons'

export default withNavigation(
  ({ destination, navigation, searchText, _onMarkerPressed }) => {
    return (
      <View style={styles.secondColumnStyle}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {icons.user_location_sm}
          <View style={{ marginVertical: 1.5 }}>{icons.vertical_dots}</View>
          {icons.marker_sm}
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.inputBox}>
            <Text style={styles.input}>Your location</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Search', {
                _onMarkerPressed: _onMarkerPressed,
                searchText: searchText
              })
            }
          >
            <View style={styles.inputBox}>
              <Text style={styles.input}>{destination}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
)
