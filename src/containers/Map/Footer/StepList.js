import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from '../styles'
import StepBox from './StepBox'
import { icons } from '../../../assets/icons'
import { COLLAPSED_HEIGHT_STEPBOX } from '../../../assets/dimension'

export default ({ steps }) => {
  return (
    <View>
      <View style={styles.topBorderStep} />
      <ScrollView
        // style={{ marginBottom: 160 }} // fix later
        contentContainerStyle={{ paddingBottom: COLLAPSED_HEIGHT_STEPBOX }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.stepBox}>
            <View style={styles.stepViewIconStyle}>{icons.marker_fill}</View>
            <View style={styles.stepTitleStyle}>
              <Text style={styles.title_step}>Your location</Text>
              <View style={styles.divider} />
            </View>
          </View>
          {steps.map((step, index) => {
            return <StepBox key={index} step={step} />
          })}
          <View style={styles.stepBox}>
            <View style={styles.stepViewIconStyle}>
              {icons.marker_fill_red}
            </View>
            <View style={styles.stepTitleStyle}>
              <Text style={styles.title_step}>Winged Figure</Text>
              <Text style={styles.meter_step_red}>
                Western side of Robsons Road
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
