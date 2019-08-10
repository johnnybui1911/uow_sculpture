import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import images from '../../assets/images'
import { icons } from '../../assets/icons'
import styles from './styles'
import LikeButton from './LikeButton'

const CardItem = props => {
  const { item, _navigateToDetail } = props
  return (
    <View
      style={{
        ...styles.cardItem,
        alignItems: item.id % 2 !== 0 ? 'flex-end' : 'flex-start'
      }}
    >
      <View
        style={item.id % 2 !== 0 ? styles.cardDesLeft : styles.cardDesRight}
      >
        <View style={{}}>
          <Text style={styles.distance}>{item.distance} m</Text>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text style={styles.description}>{item.des}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
              alignItems: 'center',
              marginLeft: -5
            }}
          >
            <LikeButton />
            <Text style={styles.numberStyle}>100</Text>
          </View>
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
      <View
        style={[
          styles.imageContainer,
          item.id % 2 !== 0 ? { left: 0 } : { right: 0 }
        ]}
      >
        <TouchableWithoutFeedback onPress={() => _navigateToDetail(item)}>
          <Image
            source={images.sculptures[item.photoURL]}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default CardItem
