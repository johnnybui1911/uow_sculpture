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
          backgroundColor: '#F6F6F6',
          borderRadius: 12,
          elevation: 2,
          justifyContent: 'center',
          alignItems: 'center',
          width: 135,
          height: 186,
          marginBottom: 12
        }}
      >
        {!item.photoURL ? (
          <Image
            source={images.empty_image}
            resizeMode="cover"
            style={[
              styles.imagePopularItem,
              { width: 120, height: 75, backgroundColor: '#F6F6F6' }
            ]}
          />
        ) : (
          <Image
            source={{ uri: item.photoURL }}
            style={styles.imagePopularItem}
          />
        )}
        <View style={styles.popularItemDetail}>
          <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <Text
              numberOfLines={2}
              style={
                item.photoURL
                  ? styles.secondaryTitle
                  : styles.secondaryTitleNoShadow
              }
            >
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PopularItem
