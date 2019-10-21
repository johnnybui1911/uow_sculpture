/**
 * Description: Nearby Sculpture Content Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import formatDistance from '../../library/formatDistance'

export default function({ item, distanceMatrix }) {
  return (
    <View style={styles.fixedImageContentBox}>
      <Text style={styles.distance}>
        {distanceMatrix && distanceMatrix[item.id]
          ? formatDistance(distanceMatrix[item.id].distance)
          : ''}
      </Text>
      <Text numberOfLines={2} style={styles.title}>
        {item.name}
      </Text>
      <Text style={[styles.description]}>{item.features.maker}</Text>
    </View>
  )
}
