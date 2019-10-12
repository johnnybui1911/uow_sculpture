import React from 'react'
import { View, StyleSheet } from 'react-native'
import palette from '../../assets/palette'

const VerticalDivider = () => (
  <View
    style={{
      height: 40,
      backgroundColor: palette.dividerColorNew,
      width: StyleSheet.hairlineWidth,
      marginVertical: 20
    }}
  />
)

export default VerticalDivider
