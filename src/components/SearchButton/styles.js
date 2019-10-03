import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { TEXT_INPUT_HEIGHT } from '../../assets/dimension'
import { shadowIOS } from '../../assets/rootStyles'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorGrey
  },
  flatList: {
    marginTop: 9,
    width: '100%'
  },
  title: {
    fontSize: 20,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold'
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
  numberStyle: {
    fontSize: 12,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold',
    paddingLeft: 5
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 24,
    height: TEXT_INPUT_HEIGHT,
    backgroundColor: palette.backgroundColorWhite,
    elevation: 2,
    borderRadius: 12,
    ...shadowIOS
  },
  searchBoxFlat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 24,
    height: TEXT_INPUT_HEIGHT,
    backgroundColor: palette.backgroundColorWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.borderGreyColor
  },
  placeholder: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: palette.secondaryTypographyColor
  }
})
