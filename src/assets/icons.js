/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Image, View } from 'react-native'
import { createIconSetFromIcoMoon, FontAwesome } from '@expo/vector-icons'
import palette from './palette'
import icoMoonConfig from './selection.json'

export const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'Font-Name')

export const icons = {
  my_location: (
    <CustomIcon name="near-me" size={24} color={palette.primaryColorLight} />
  ),
  user_location: <Image source={require('./images/user-location.png')} />,
  chosen_marker: <Image source={require('./images/chosen-marker.png')} />,
  marker: (
    <Image
      source={require('./images/maps-and-flags.png')}
      style={{ width: 28, height: 28 }}
    />
  ),
  fullName: (
    <CustomIcon name="user" size={24} color={palette.primaryColorLight} />
  ),
  camera: (
    <CustomIcon name="camera" size={40} color={palette.backgroundColorWhite} />
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
      style={{ padding: 10 }}
    />
  ),
  like: (
    <CustomIcon name="heart-o" size={16} color={palette.backgroundColorWhite} />
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
