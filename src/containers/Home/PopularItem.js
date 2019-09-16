import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import images from '../../assets/images'
import palette from '../../assets/palette'

const PopularItem = props => {
  const { item, index, navigation } = props
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Detail', { id: item.id })}
    >
      <View
        style={{
          marginLeft: index === 0 ? 24 : 0,
          marginRight: 12,
          backgroundColor: palette.backgroundColorGrey,
          borderRadius: 12,
          elevation: 4
        }}
      >
        <Image
          source={{ uri: item.photoURL }}
          style={styles.imagePopularItem}
        />
        <View style={styles.popularItemDetail}>
          <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <Text numberOfLines={2} style={styles.secondaryTitle}>
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PopularItem
