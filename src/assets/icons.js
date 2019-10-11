/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import {
  createIconSetFromIcoMoon,
  FontAwesome,
  AntDesign,
  MaterialIcons
} from '@expo/vector-icons'
import palette from './palette'
import icoMoonConfig from './selection.json'
import images from './images'

export const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'Font-Name')
export const DirectionIcon = maneuver => (
  <CustomIcon
    name={maneuver ? maneuver : 'straight'}
    size={20}
    color={palette.primaryColorLight}
  />
)

const socialSize = 18

export const icons = {
  edit: (
    <MaterialIcons name="edit" size={22} color={palette.primaryColorLight} />
  ),
  delete: (
    <MaterialIcons name="delete" size={22} color={palette.primaryColorLight} />
  ),
  check: ({ style }) => (
    <MaterialIcons
      name="check"
      size={24}
      color={palette.primaryColorLight}
      style={[style]}
    />
  ),
  alert: (
    <MaterialIcons
      name="error-outline"
      size={14}
      color={palette.secondaryColor}
    />
  ),
  noun_arrow: (
    <CustomIcon name="noun-arrow" size={24} color={palette.primaryColorLight} />
  ),
  clock: (
    <View
      style={{
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30 / 2,
        backgroundColor: palette.primaryColorLight
      }}
    >
      <CustomIcon name="clock" size={16} color={palette.backgroundColorWhite} />
    </View>
  ),
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
  marker_fill_w: (
    <View
      style={{
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30 / 2,
        backgroundColor: palette.primaryColorLight
      }}
    >
      <CustomIcon
        name="marker-s"
        size={16}
        color={palette.backgroundColorWhite}
      />
    </View>
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
  back: props => (
    <CustomIcon name="back" size={24} style={{ ...props.style }} />
  ),
  back_blue: ({ size = 24 }) => (
    <CustomIcon name="back" size={size} color={palette.primaryColor} />
  ),
  back_blue_light: (
    <CustomIcon
      name="back"
      size={24}
      color={palette.primaryColorLight}
      // style={{ padding: 10, paddingBottom: 13 }} // icons not center
    />
  ),
  close: (
    <CustomIcon name="close" size={16} color={palette.primaryColorLight} />
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
  marker: (
    <Image
      style={{ width: 22, height: 40 }}
      source={require('./images/chosen-marker.png')}
      resizeMode="contain"
    />
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
  // facebook: (
  //   <CustomIcon
  //     name="facebook"
  //     size={24}
  //     color={palette.backgroundColorWhite}
  //   />
  // ),
  google: (
    <Image
      source={require('./images/google.png')}
      style={{ width: 24, height: 24 }}
    />
  ),
  facebook: (
    <Image
      source={require('./images/facebook.png')}
      style={{ width: 24, height: 24 }}
      resizeMode="contain"
    />
  ),
  logo: <CustomIcon name="logo" size={120} color={palette.secondaryColor} />,
  one_dot: (
    <FontAwesome
      name="circle"
      size={3}
      color={palette.secondaryTypographyColor}
      style={{ paddingHorizontal: 6 }}
    />
  ),
  vertical_dots: (
    <MaterialIcons name="more-vert" size={24} color={palette.primaryColor} />
  ),
  vertical_dots_light: (
    <MaterialIcons
      name="more-horiz"
      size={24}
      color={palette.primaryColorLight}
    />
  ),
  up_arrow: (
    <FontAwesome
      name="chevron-up"
      size={30}
      color={palette.backgroundColorWhite}
    />
  ),
  micro: (
    <CustomIcon name="micro" size={20} color={palette.primaryColorLight} />
  ),
  like_transparent: (
    <Image
      source={require('./images/like-transparent.png')}
      style={{ width: 20, height: 17.5 }}
      resizeMode="contain"
    />
  ),
  like_fill_img: (
    <Image
      source={require('./images/like-fill.png')}
      style={{ width: 20, height: 17.5 }}
      resizeMode="contain"
    />
  ),
  like: (
    <CustomIcon
      name="heart-o"
      size={socialSize}
      color={palette.backgroundColorWhite}
    />
  ),
  like_fill_white: (
    <CustomIcon
      name="heart-f"
      size={socialSize}
      color={palette.backgroundColorWhite}
    />
  ),
  like_fill_popup: (
    <AntDesign name="heart" color={palette.backgroundColorWhite} size={60} />
  ),
  like_outline: (
    <CustomIcon
      name="heart-o"
      size={socialSize}
      color={palette.primaryColorLight}
    />
  ),
  like_fill: (
    <CustomIcon
      name="heart-f"
      size={socialSize}
      color={palette.secondaryColor}
    />
  ),
  comment: (
    <CustomIcon
      name="comment-o"
      size={socialSize}
      color={palette.primaryColorLight}
    />
  )
}
