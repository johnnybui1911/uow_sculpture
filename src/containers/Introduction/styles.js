import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../assets/dimension'

export default StyleSheet.create({
  container: {
    // position: 'absolute',
    // height: SCREEN_HEIGHT,
    // width: SCREEN_WIDTH,
    // top: -STATUS_BAR_HEIGHT,
    flex: 1,
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
