import { StyleSheet } from 'react-native'
import palette from '../../../assets/palette'
import { STATUS_BAR_HEIGHT } from '../../../assets/dimension'

export default StyleSheet.create({
  searchBoxContainer: {
    marginTop: STATUS_BAR_HEIGHT,
    zIndex: 1
  },
  formDirectionStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 4,
    width: '100%',
    maxHeight: 171,
    top: 0,
    paddingTop: STATUS_BAR_HEIGHT + 12,
    zIndex: 1000
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButtonContainerStyle: {
    height: '100%',
    marginHorizontal: 12,
    marginTop: 8
  },
  backButtonStyle: {
    paddingVertical: 4
  },
  secondColumnStyle: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8
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
