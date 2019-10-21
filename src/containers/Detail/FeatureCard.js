/**
 * Description: Feature Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Text } from 'react-native'
import Divider from '../../components/Divider/Divider'
import styles from './styles'

export default function FeatureCard(props) {
  const { item, elevation } = props
  const cardStyle = [styles.card, { elevation, paddingBottom: 16 }]
  return (
    <View style={cardStyle}>
      <View style={styles.contentBox}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { fontSize: 14 }]}>Production Date</Text>
        </View>
        <View style={{ width: 150 }}>
          <Text style={styles.alt_description}>
            {!item.features.date ? 'N/A' : item.features.date}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={styles.contentBox}>
        <Text style={[styles.title, { fontSize: 14 }]}>Maker</Text>
        <View style={{ width: 200 }}>
          <Text style={styles.alt_description}>
            {!item.features.maker ? 'N/A' : item.features.maker}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={styles.contentBox}>
        <Text style={[styles.title, { fontSize: 14 }]}>Materials</Text>
        <View style={{ width: 200 }}>
          <Text style={styles.alt_description}>
            {!item.features.material ? 'N/A' : item.features.material}
          </Text>
        </View>
      </View>
    </View>
  )
}
