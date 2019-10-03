import React from 'react'
import { View } from 'react-native'
import { SCREEN_HEIGHT } from '../../assets/dimension'

export default function({ opacity = 0.7 }) {
  return (
    <View
      style={{
        position: 'absolute',
        height: SCREEN_HEIGHT,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        zIndex: 100,
        opacity: opacity
      }}
    />
  )
}
