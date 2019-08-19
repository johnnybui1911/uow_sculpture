import React from 'react'
import { View, TextInput } from 'react-native'
import styles from './styles'
import { icons } from '../../../assets/icons'

export default ({ destination }) => {
  return (
    <View style={styles.secondColumnStyle}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {icons.user_location_sm}
        <View style={{ marginVertical: 1.5 }}>{icons.vertical_dots}</View>
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
            value={destination}
            // onChangeText={email => this.setState({ email })}
            placeholder="Destination"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  )
}
