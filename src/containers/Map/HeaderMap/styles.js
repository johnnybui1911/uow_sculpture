import { StyleSheet } from 'react-native'
import palette from '../../../assets/palette'
import {
  STATUS_BAR_HEIGHT,
  HEADER_BAR_MARGIN_TOP
} from '../../../assets/dimension'
import { shadowIOS } from '../../../assets/rootStyles'

export default StyleSheet.create({
  searchBoxContainer: {
    marginTop: HEADER_BAR_MARGIN_TOP,
    zIndex: 1
  },
  formDirectionStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 4,
    width: '100%',
    maxHeight: 171,
    top: 0,
    paddingTop: HEADER_BAR_MARGIN_TOP,
    zIndex: 1000,
    ...shadowIOS
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonContainerStyle: {
    height: '100%',
    // marginRight: 12,
    marginTop: 8,
    marginLeft: 24
  },
  backButtonStyle: {
    paddingVertical: 4
  },
  secondColumnStyle: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginRight: 24
  },
  inputBox: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    height: 36,
    // maxWidth: 272,
    backgroundColor: palette.backgroundColorWhite,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: palette.secondaryTypographyColor
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: palette.primaryColor
  },
  walkingBox: {
    backgroundColor: 'rgba(89, 152, 255, 0.15)',
    height: 25,
    width: 96,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12
  },
  title_sm: {
    fontSize: 12,
    color: palette.primaryColorLight,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginLeft: 3
  }
})
