/**
 * Description: Personal Feature Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import Divider from '../../components/Divider/Divider'
import styles from './styles'

const FeatureCard = ({ email, joinDate }) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentBox}>
        <Text style={[styles.title, { fontSize: 14 }]}>Email</Text>
        <Text style={styles.alt_description}>{email}</Text>
      </View>
      <Divider />
      <View style={styles.contentBox}>
        <Text style={[styles.title, { fontSize: 14 }]}>Join Date</Text>
        <Text style={styles.alt_description}>
          {moment(joinDate).format('MMM Do YYYY')}
        </Text>
      </View>
    </View>
  )
}

export default FeatureCard
