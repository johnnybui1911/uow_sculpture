import React from 'react'
import { View, Platform } from 'react-native'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'
import palette from '../../assets/palette'

export default function({ backgroundColor = palette.backgroundTabColor }) {
  return Platform.OS === 'ios' ? (
    <View
      style={{
        height: STATUS_BAR_HEIGHT,
        backgroundColor,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }}
    />
  ) : null
}
