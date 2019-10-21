/**
 * Description: No Result Screen
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
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
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onStartShouldSetResponderCapture={e => {
        const focusField = TextInput.State.currentlyFocusedField()
        if (focusField != null && e.nativeEvent.target != focusField) {
          TextInput.State.blurTextInput(TextInput.State.currentlyFocusedField())
        }
      }}
    >
      <Text style={[styles.description, { fontSize: 18 }]}>{title}</Text>
    </View>
  )
}
