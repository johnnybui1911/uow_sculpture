import React from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from '../styles'
import StepBox from './StepBox'
import { icons } from '../../../assets/icons'
import { COLLAPSED_HEIGHT_STEPBOX } from '../../../assets/dimension'

const StepList = ({ steps, selectedMarker }) => {
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
            {selectedMarker && (
              <View style={styles.stepTitleStyle}>
                <Text style={styles.title_step}>{selectedMarker.name}</Text>
                {/* <Text numberOfLines={2} style={styles.meter_step_red}>
                  {selectedMarker.description.location}
                </Text> */}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(StepList)
