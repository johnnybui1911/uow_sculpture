import React from 'react'
import { View, Text } from 'react-native'
import Divider from '../../components/Divider/Divider'
import styles from './styles'

export default function FeatureCard(props) {
  const { item } = props
  return (
    <View style={[styles.card]}>
      <View style={styles.contentBox}>
        <Text style={[styles.title, { fontSize: 14 }]}>Created Date</Text>
        <Text style={styles.alt_description}>{item.features.date}</Text>
      </View>
      <Divider />
      <View style={styles.contentBox}>
        <Text style={[styles.title, { fontSize: 14 }]}>Maker</Text>
        <Text style={styles.alt_description}>{item.features.maker}</Text>
      </View>
      <Divider />
      <View style={styles.contentBox}>
        <Text style={[styles.title, { fontSize: 14 }]}>Materials</Text>
        <Text style={styles.alt_description}>{item.features.material}</Text>
      </View>
    </View>
  )
}
