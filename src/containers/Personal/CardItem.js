import React from 'react'
import { View, Text, Image } from 'react-native'
import images from '../../assets/images'
import { icons } from '../../assets/icons'
import styles from './styles'

const CardItem = props => {
  const { item } = props
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
          <Text style={styles.description}>{item.features.maker}</Text>
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
              marginRight: 20
            }}
          >
            {item.id % 2 !== 0 ? icons.like_outline : icons.like_fill}
            <Text style={styles.numberStyle}>100</Text>
          </View>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            {icons.comment}
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
        <Image source={images.sculptures[item.photoURL]} style={styles.image} />
      </View>
    </View>
  )
}

export default CardItem
