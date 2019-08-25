import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT
} from '../../assets/dimension'

export default StyleSheet.create({
  container: {
    // position: "absolute",
    // top: -STATUS_BAR_HEIGHT,
    // height: SCREEN_HEIGHT,
    // width: SCREEN_WIDTH,
    backgroundColor: palette.primaryColor,
    alignItems: 'center',
    paddingVertical: 12
  },
  title: {
    fontSize: 30,
    color: palette.backgroundColorWhite,
    fontFamily: 'Montserrat-Bold'
  },
  description: {
    fontSize: 16,
    color: palette.backgroundColorWhite,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center'
  }
})
