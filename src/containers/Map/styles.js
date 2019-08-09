import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { SCREEN_WIDTH } from '../../assets/dimension'

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
  flatList: {
    marginTop: 9,
    width: '100%'
  },
  title: {
    fontSize: 36,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold'
  },
  distance: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: palette.primaryColorLight
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
    minHeight: 90,
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mini_image_container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    ...shadowStyle
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12
  },
  description_container: {
    flex: 1,
    minHeight: 215,
    paddingHorizontal: 24,
    backgroundColor: palette.backgroundColorWhite,
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    ...shadowStyle,
    elevation: 10
  },
  button: {
    flex: 1,
    backgroundColor: palette.primaryColorLight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10,
    minHeight: 51,
    ...shadowStyle
  },
  titleButton: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: palette.backgroundColorWhite,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    color: palette.secondaryTypographyColor,
    fontFamily: 'Montserrat-Medium'
  },
  unselected_marker: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: palette.secondaryColor
  }
})
