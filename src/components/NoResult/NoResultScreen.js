import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import palette from '../../assets/palette'

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: palette.secondaryTypographyColor,
    fontFamily: 'Montserrat-Medium'
  }
})

export default function({ title }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={[styles.description, { fontSize: 22 }]}>{title}</Text>
    </View>
  )
}
