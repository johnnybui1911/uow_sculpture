import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { SCREEN_HEIGHT } from '../../assets/dimension'
export default function({ opacity = 0.7, isVisible = true, onPress }) {
  return isVisible ? (
    <TouchableWithoutFeedback
      onPress={() => {
        // console.log('trigger')
        onPress()
      }}
    >
      <View
        style={{
          position: 'absolute',
          height: SCREEN_HEIGHT,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#000000',
          zIndex: 1,
          elevation: 2,
          opacity: opacity
        }}
      />
    </TouchableWithoutFeedback>
  ) : null
}
