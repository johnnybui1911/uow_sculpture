import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorGrey
  },
  nearbyList: {},
  popularList: {
    marginTop: 28,
    marginBottom: 14
  },
  listTitle: {
    paddingLeft: 24,
    fontSize: 16,
    color: palette.primaryTypographyColor,
    fontFamily: 'Montserrat-SemiBold'
  },
  flatList: {
    marginTop: 9
  },
  title: {
    fontSize: 26,
    color: palette.backgroundColorWhite,
    textShadowColor: '#474747',
    textShadowOffset: { width: 0.5, height: 3 },
    textShadowRadius: 5,
    fontFamily: 'Montserrat-SemiBold'
  },
  like: {
    fontSize: 16,
    color: palette.backgroundColorWhite,
    textShadowColor: '#474747',
    textShadowOffset: { width: 0.5, height: 3 },
    textShadowRadius: 5,
    fontFamily: 'Montserrat-SemiBold'
  },
  secondaryTitle: {
    fontSize: 14,
    color: palette.backgroundColorWhite,
    textShadowColor: '#474747',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily: 'Montserrat-SemiBold'
  }
})
