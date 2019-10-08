import { StyleSheet, Platform } from 'react-native'
import palette from '../../assets/palette'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  FULL_SCREEN_HEIGHT
} from '../../assets/dimension'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    height: FULL_SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    top: Platform.OS === 'ios' ? 0 : -STATUS_BAR_HEIGHT,
    backgroundColor: palette.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6
  },
  title: {
    fontSize: 30,
    color: palette.backgroundColorWhite,
    fontFamily: 'Montserrat-Bold'
  },
  description: {
    fontSize: 14,
    color: palette.backgroundColorWhite,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center'
  }
})
