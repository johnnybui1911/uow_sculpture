import React from 'react'
import { View, Text } from 'react-native'
import numeral from 'numeral'
import styles from '../styles'
import { icons, DirectionIcon } from '../../../assets/icons'

const decodeStepInstruction = html_instructions => {
  const regex = /(<b>|<\/b>|<div.*)/gi
  return html_instructions.replace(regex, '')
}

export default ({ step }) => {
  const {
    maneuver,
    distance: { value },
    html_instructions
  } = step
  const distance =
    value >= 1000
      ? numeral(distance.value).format('0.0 a') + 'ilometer'
      : `${value} meters`
  const instruction = decodeStepInstruction(html_instructions)
  return (
    <View style={styles.stepBox}>
      <View style={styles.stepViewIconStyle}>{DirectionIcon(maneuver)}</View>
      <View style={styles.stepTitleStyle}>
        <Text style={styles.title_step}>{instruction}</Text>
        <View style={styles.stepBoxDetail}>
          <View
            style={{
              justifyContent: 'center'
            }}
          >
            <Text style={styles.meter_step}>{distance}</Text>
          </View>
          <View style={styles.dividerContainer}>
            <View style={{ ...styles.divider, marginTop: 0 }} />
          </View>
        </View>
      </View>
    </View>
  )
}
