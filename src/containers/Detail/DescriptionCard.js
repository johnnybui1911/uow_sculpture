/**
 * Description: Description Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Text } from 'react-native'
import Divider from '../../components/Divider/Divider'
import styles from './styles'

export default function DescriptionCard(props) {
  const { item, elevation } = props
  const cardStyle = [styles.card, { elevation, paddingBottom: 16 }]
  return (
    <View style={cardStyle}>
      <Text style={[styles.title, { fontSize: 20 }]}>Description</Text>
      <Divider />
      <View>
        <Text style={[styles.title, { fontSize: 14, paddingBottom: 3 }]}>
          Location General Notes
        </Text>
        <Text style={styles.description}>
          {!item.description.location ? 'N/A' : item.description.location}
        </Text>
      </View>
      <Divider />
      <View>
        <Text style={[styles.title, { fontSize: 14, paddingBottom: 3 }]}>
          Credit Line
        </Text>
        <Text style={styles.description}>
          {!item.description.creditLine ? 'N/A' : item.description.creditLine}
        </Text>
      </View>
    </View>
  )
}
