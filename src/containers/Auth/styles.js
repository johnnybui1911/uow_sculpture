import { StyleSheet, Dimensions } from 'react-native'
import palette from '../../assets/palette'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const HEADER_HEIGHT = 209

const shadowStyle = {
  elevation: 4,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 0.1
}

const inputBox = {
  marginBottom: 10,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 24,
  height: 51,
  backgroundColor: palette.backgroundColorWhite,
  borderRadius: 12
}
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorGrey
  },
  header: { height: HEADER_HEIGHT, backgroundColor: palette.primaryColor },
  title: {
    fontSize: 24,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center'
  },
  titleButton: {
    fontSize: 16,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center'
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: palette.primaryColorLight
  },
  description: {
    fontSize: 14,
    color: palette.secondaryTypographyColor,
    fontFamily: 'Montserrat-Medium'
  },
  box: { ...inputBox, ...shadowStyle },
  inputBox: {
    ...inputBox,
    borderWidth: 1,
    borderColor: palette.secondaryTypographyColor
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: palette.primaryTypographyColor
  },
  lineSeparator: {
    height: 1,
    width: SCREEN_WIDTH / 2.2,
    backgroundColor: palette.secondaryTypographyStrongColor
  },
  middleSeparator: {
    height: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT <= 812 ? 10 : 30,
    marginBottom: SCREEN_HEIGHT <= 812 ? 20 : 40
  }
})
