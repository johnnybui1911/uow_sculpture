import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const styles = StyleSheet.create({
  overlayImage: {
    position: 'absolute',
    paddingHorizontal: 24,
    paddingVertical: 7,
    bottom: 0,
    height: 60,
    width: '100%',
    // borderBottomRightRadius: 12,
    // borderBottomLeftRadius: 12,
    justifyContent: 'flex-end',
    zIndex: 10
  }
})

export default () => (
  <LinearGradient
    colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 1)']}
    style={styles.overlayImage}
  />
)
