/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import {
  createIconSetFromIcoMoon,
  FontAwesome,
  AntDesign
} from '@expo/vector-icons'
import palette from './palette'
import icoMoonConfig from './selection.json'
import images from './images'

const styles = StyleSheet.create({
  oval_large_style: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 0,11,0.25)',
    position: 'absolute',
    bottom: 0,
    borderRadius: 50,
    transform: [{ scaleX: 2 }]
  },
  oval_small_style: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    transform: [{ scaleX: 2 }],
    position: 'absolute',
    bottom: 5
  }
})

export const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'Font-Name')

export const DirectionIcon = maneuver => (
  <CustomIcon
    name={maneuver ? maneuver : 'straight'}
    size={20}
    color={palette.primaryColorLight}
  />
)

export const icons = {
  trophy: <Image source={images.trophy} />,
  head_forward: (
    <CustomIcon
      name="up-straight"
      size={24}
      color={palette.primaryColorLight}
    />
  ),
  turn_left: (
    <CustomIcon name="turn-left" size={24} color={palette.primaryColorLight} />
  ),
  turn_right: (
    <CustomIcon name="turn-right" size={24} color={palette.primaryColorLight} />
  ),
  marker_fill: (
    <CustomIcon name="marker-s" size={24} color={palette.primaryColorLight} />
  ),
  marker_fill_red: (
    <CustomIcon name="marker-s" size={24} color={palette.secondaryColor} />
  ),
  walking: (
    <CustomIcon
      name="pedestrian-walking"
      size={15}
      color={palette.primaryColorLight}
    />
  ),
  exchange: (
    <CustomIcon name="exchange-arrows" size={24} color={palette.primaryColor} />
  ),
  back: <CustomIcon name="back" size={24} color="#fff" />,
  back_blue: <CustomIcon name="back" size={24} color={palette.primaryColor} />,
  close: (
    <CustomIcon
      name="close"
      size={20}
      color={palette.primaryColorLight}
      style={{ padding: 10 }}
    />
  ),
  close_w: (
    <View
      style={{
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: palette.backgroundColorWhite
      }}
    >
      <CustomIcon name="close" size={10} color="#000000" />
    </View>
  ),
  my_location_f: (
    <CustomIcon name="near-me-f" size={24} color={palette.primaryColorLight} />
  ),
  my_location: (
    <CustomIcon name="near-me" size={24} color={palette.primaryColorLight} />
  ),
  user_location: <Image source={require('./images/user-location.png')} />,
  user_location_sm: <Image source={require('./images/user-location-sm.png')} />,
  chosen_marker: (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
    >
      <View style={styles.oval_large_style} />
      <View style={styles.oval_small_style} />
      <View>
        <Image source={require('./images/marker.png')} />
      </View>
    </View>
  ),
  marker: (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
    >
      <View>
        <Image source={require('./images/marker.png')} />
      </View>
    </View>
  ),
  marker_sm: <Image source={require('./images/marker-sm.png')} />,
  fullName: (
    <CustomIcon name="user" size={24} color={palette.primaryColorLight} />
  ),
  camera: (
    <View
      style={{
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: palette.primaryColor
      }}
    >
      <CustomIcon
        name="camera"
        size={40}
        color={palette.backgroundColorWhite}
      />
    </View>
  ),
  lock: <CustomIcon name="lock" size={24} color={palette.primaryColorLight} />,
  mail: <CustomIcon name="email" size={24} color={palette.primaryColorLight} />,
  facebook: (
    <CustomIcon
      name="facebook"
      size={24}
      color={palette.backgroundColorWhite}
    />
  ),
  google: <Image source={require('./images/google.png')} />,
  logo: <CustomIcon name="logo" size={120} color={palette.secondaryColor} />,
  one_dot: (
    <FontAwesome
      name="circle"
      size={5}
      color={palette.secondaryTypographyColor}
      style={{ paddingHorizontal: 6 }}
    />
  ),
  vertical_dots: (
    <View>
      {[1, 2, 3].map(index => {
        return (
          <FontAwesome
            key={index}
            name="circle"
            size={3}
            color={palette.primaryColor}
            style={{ marginVertical: 1.5 }}
          />
        )
      })}
    </View>
  ),
  up_arrow: (
    <FontAwesome
      name="chevron-up"
      size={30}
      color={palette.backgroundColorWhite}
    />
  ),
  micro: (
    <CustomIcon
      name="micro"
      size={20}
      color={palette.primaryColorLight}
      style={{ padding: 10, elevation: 4 }}
    />
  ),
  like: (
    <CustomIcon name="heart-o" size={16} color={palette.backgroundColorWhite} />
  ),
  like_fill_white: (
    <CustomIcon name="heart-f" size={16} color={palette.backgroundColorWhite} />
  ),
  like_fill_popup: (
    <AntDesign name="heart" color={palette.backgroundColorWhite} size={60} />
  ),
  like_outline: (
    <CustomIcon name="heart-o" size={16} color={palette.primaryColorLight} />
  ),
  like_fill: (
    <CustomIcon name="heart-f" size={16} color={palette.secondaryColor} />
  ),
  comment: (
    <CustomIcon name="comment-o" size={16} color={palette.primaryColorLight} />
  )
}
