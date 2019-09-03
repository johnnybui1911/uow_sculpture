import React from 'react'
import { View } from 'react-native'
import styles from './styles'

export default function DividerLight({ style = {} }) {
  return <View style={[styles.dividerLight, { ...style }]} />
}
