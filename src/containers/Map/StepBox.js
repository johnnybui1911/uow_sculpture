import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { icons } from '../../assets/icons'

export default ({ step }) => {
  return (
    <View style={styles.stepBox}>
      <View style={{ height: '100%' }}>{icons.head_forward}</View>
      <View style={styles.stepTitleStyle}>
        <Text style={styles.title_step}>Turn ...</Text>
        <View style={styles.stepBoxDetail}>
          <View
            style={{
              justifyContent: 'center'
            }}
          >
            <Text style={styles.meter_step}>10 meters</Text>
          </View>
          <View style={styles.dividerContainer}>
            <View style={{ ...styles.divider, marginTop: 0 }} />
          </View>
        </View>
      </View>
    </View>
  )
}
