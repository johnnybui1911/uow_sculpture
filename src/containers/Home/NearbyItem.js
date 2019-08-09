import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import styles from './styles'
import { icons } from '../../assets/icons'
import images from '../../assets/images'

const { width, height } = Dimensions.get('window')
// default width 327
const PADDING = 12

const NearbyItem = props => {
  const { item, navigation } = props
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <View
        style={{
          width: width - PADDING * 2,
          height: 378,
          marginHorizontal: PADDING,
          paddingHorizontal: PADDING
        }}
      >
        <Image
          source={images.sculptures[item.photoURL]}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 12
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 290,
            flexDirection: 'row',
            marginLeft: PADDING * 2 // trash fix, to be continued
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between'
              // backgroundColor: 'red'
            }}
          >
            <Text style={styles.title}>{item.distance} m</Text>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <View
            style={{
              // backgroundColor: 'yellow',
              alignItems: 'center'
            }}
          >
            <Text style={[{ marginTop: 18 }]}>{icons.like}</Text>
            <Text style={[styles.like, { marginTop: 10 }]}>100</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default NearbyItem
