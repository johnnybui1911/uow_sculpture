/**
 * Description: Custom Tab Header Bar
 * Author: Nam Bui
 **/

import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const HeaderBar = props => {
  const { headerName } = props
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{headerName}</Text>
    </View>
  )
}

export default HeaderBar
