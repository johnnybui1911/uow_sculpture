/**
 * Description: Swipe Button Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View } from 'react-native'
import palette from '../../assets/palette'

export default () => (
  <View style={{ alignItems: 'center' }}>
    <View
      style={{
        height: 3,
        backgroundColor: palette.secondaryTypographyColor,
        width: 32,
        borderRadius: 12
      }}
    />
  </View>
)
