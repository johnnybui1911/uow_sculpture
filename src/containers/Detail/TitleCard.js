import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Divider from '../../components/Divider/Divider'
import { icons } from '../../assets/icons'
import styles from './styles'
import LikeButton from '../Collection/LikeButton'

export default function TitleCard(props) {
  const { item, elevation } = props
  const cardStyle = [styles.card, { elevation, marginTop: 0 }]
  return (
    <View style={cardStyle}>
      <Text style={styles.distance}>{item.distance}</Text>
      <Text style={styles.title}>{item.name}</Text>
      <Divider />
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          flexDirection: 'row'
        }}
      >
        <LikeButton />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -5
          }}
        >
          <TouchableWithoutFeedback>
            <View style={{ padding: 5 }}>{icons.comment}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.numberStyle}>2</Text>
        </View>
      </View>
    </View>
  )
}
