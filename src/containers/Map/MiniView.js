import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import styles from './styles'
import images from '../../assets/images'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'
import Divider from '../../components/Divider/Divider'
import ButtonMyLocation from '../../components/ButtonMyLocation/ButtonMyLocation'

export default ({
  marker,
  _centerUserLocation,
  _navigateToDetail,
  children
}) => {
  return (
    <View style={styles.mini_view_container}>
      <View style={styles.transparent_container}>
        <TouchableWithoutFeedback onPress={() => _navigateToDetail(marker)}>
          <View style={styles.mini_image_container}>
            <Image
              source={images.sculptures[marker.photoURL]}
              style={styles.image}
            />
          </View>
        </TouchableWithoutFeedback>
        {children}
        {/* <ButtonMyLocation _centerUserLocation={_centerUserLocation} /> */}
      </View>
      <View style={styles.description_container}>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              height: 3,
              backgroundColor: palette.secondaryTypographyColor,
              width: 32,
              borderRadius: 12
            }}
          />
        </View>
        <Text style={styles.distance}>500 m</Text>
        <Text style={styles.title}>{marker.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={styles.description}>{marker.des}</Text>
          {icons.one_dot}
          <Text style={styles.description}>5 min</Text>
        </View>
        <Divider />
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
            {icons.like_fill}
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
        <TouchableOpacity style={[styles.button]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.titleButton]}>GO THERE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
