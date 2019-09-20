import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUS_BAR_HEIGHT,
  BUTTON_HEIGHT
} from '../../assets/dimension'

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

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorGrey
  },
  mapStyle: {
    flex: 1,
    position: 'absolute',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  title: {
    fontSize: 26,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold'
  },
  title_sm: {
    fontSize: 12,
    color: palette.primaryColorLight,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginLeft: 3
  },
  title_step: {
    fontSize: 14,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-Medium',
    paddingRight: 24
  },
  meter_step_red: {
    fontSize: 10,
    color: palette.secondaryColor,
    fontFamily: 'Montserrat-Medium'
  },
  meter_step: {
    fontSize: 10,
    color: palette.primaryColorLight,
    fontFamily: 'Montserrat-Medium'
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: palette.primaryColorLight
  },
  distance_grey: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: palette.secondaryTypographyColor
  },
  minuteStyle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: palette.primaryColor
  },
  numberStyle: {
    fontSize: 12,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold',
    paddingLeft: 5
  },
  markerTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: palette.secondaryColor
  },
  mini_view_container: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    bottom: 0
  },
  button_my_location: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: palette.backgroundColorWhite,
    ...shadowStyle
  },
  transparent_container: {
    // height: 90,
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    // paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mini_image_container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12
  },
  description_container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: palette.backgroundColorWhite,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    ...shadowStyle
    // elevation: 10
  },
  description_container_sm: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: palette.backgroundColorWhite,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    ...shadowStyle,
    elevation: 9
  },
  button: {
    backgroundColor: palette.primaryColorLight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 12,
    height: BUTTON_HEIGHT
    // ...shadowStyle
  },
  secondary_button: {
    flex: 1,
    backgroundColor: palette.backgroundColorWhite,
    borderWidth: 1,
    borderColor: palette.primaryColorLight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 12,
    height: BUTTON_HEIGHT
    // ...shadowStyle
  },
  titleButton: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: palette.backgroundColorWhite,
    textAlign: 'center'
  },
  secondaryTitleButton: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: palette.primaryColorLight,
    textAlign: 'center'
  },
  description: {
    fontSize: 12,
    color: palette.secondaryTypographyColor,
    fontFamily: 'Montserrat-Medium'
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
  stepBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 10, //20
    paddingTop: 24
  },
  stepBoxDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 10,
    marginTop: 24
  },
  stepTitleStyle: { flex: 1 },
  stepViewIconStyle: {
    height: '100%',
    width: 50,
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24
  },
  divider: {
    height: 1,
    backgroundColor: '#EBEBEB',
    width: '100%',
    marginTop: 24
  },
  dividerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 14
  },
  stepsContainer: {
    flex: 1,
    // paddingHorizontal: 24,
    backgroundColor: palette.backgroundColorWhite,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    ...shadowStyle,
    // minHeight: 142 + 16, //fix later,
    // maxHeight: SCREEN_HEIGHT - STATUS_BAR_HEIGHT, //44
    elevation: 9
  },
  showStepButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    zIndex: 9
    // elevation: 9
  },
  topBorderStep: {
    height: 1,
    backgroundColor: '#EBEBEB',
    width: SCREEN_WIDTH,
    top: 0,
    position: 'absolute'
    // zIndex: 100
  },
  oval_large_style: {
    width: 10,
    height: 12,
    backgroundColor: '#FF0A00',
    position: 'absolute',
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
    bottom: 6
  },
  oval_small_style: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: '#fff',
    transform: [{ scaleX: 2 }],
    position: 'absolute',
    bottom: 6 + 4
  },
  unselected_marker: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: '#FF0A00'
  }
})
