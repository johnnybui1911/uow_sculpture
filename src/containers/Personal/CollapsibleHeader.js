import React from 'react'
import { Animated, View, Text, Image } from 'react-native'
import palette from '../../assets/palette'
import styles from './styles'
import {
  MINI_HEADER_HEIGHT,
  PROFILE_TAB_BAR_HEIGHT,
  PROFILE_HEADER_HEIGHT
} from '../../assets/dimension'

const CollapsibleHeader = ({ user, opacityAnimate }) => {
  return (
    <Animated.View
      style={{
        opacity: opacityAnimate,
        position: 'absolute',
        bottom: PROFILE_TAB_BAR_HEIGHT,
        left: 0,
        right: 0,
        backgroundColor: palette.backgroundColorWhite,
        zIndex: 0,
        height: PROFILE_HEADER_HEIGHT
      }}
    >
      <View style={{ flex: 1 }} />
      <Animated.View
        style={{
          height: MINI_HEADER_HEIGHT,
          paddingHorizontal: 24,
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <View style={{ flex: 1 }}>
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: opacityAnimate
              }
            ]}
          >
            {!user.username ? null : user.username}
          </Animated.Text>
        </View>
        <View
          style={{
            width: 40,
            alignItems: 'flex-end'
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40,
              backgroundColor: palette.secondaryTypographyColor,
              overflow: 'hidden'
            }}
          >
            <Image
              source={{ uri: user.picture }}
              style={{ height: 40, width: 40 }}
              resizeMode="cover"
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

export default CollapsibleHeader