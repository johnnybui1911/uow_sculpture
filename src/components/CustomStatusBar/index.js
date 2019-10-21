/**
 * Description: Custom Status Bar for IOS (Iphone X, 11 and Iphone <= 8)
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Platform } from 'react-native'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'
import palette from '../../assets/palette'
import { SafeAreaConsumer } from 'react-native-safe-area-view'

export default function({ backgroundColor = palette.backgroundTabColor }) {
  return Platform.OS === 'ios' ? (
    <SafeAreaConsumer>
      {insets => {
        const FIX_NOTCH_HEADER =
          Platform.OS === 'ios' && insets.top > 20 ? insets.top - 20 : 0
        return (
          <View
            style={{
              height: STATUS_BAR_HEIGHT + FIX_NOTCH_HEADER,
              backgroundColor,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          />
        )
      }}
    </SafeAreaConsumer>
  ) : null
}
