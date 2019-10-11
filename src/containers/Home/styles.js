import { StyleSheet, Dimensions } from 'react-native'
import palette from '../../assets/palette'
import { DEFAULT_PADDING } from '../../assets/dimension'

const shadowStyle = {
  elevation: 2,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 0.1
}

const WIDTH = Math.floor(Dimensions.get('window').width)
const PADDING = 12
export const IMAGE_WIDTH = WIDTH - PADDING * 2
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.05

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorWhite
  },
  nearbyView: {
    minHeight: IMAGE_HEIGHT + PADDING * 2,
    alignItems: 'center',
    marginBottom: 12
  },
  nearbyItemStyle: {
    // root container
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    padding: PADDING,
    margin: PADDING,
    backgroundColor: palette.backgroundColorWhite,
    borderRadius: 12,
    marginTop: 0,
    marginBottom: PADDING * 2
    // alignItems: 'center'
  },
  imageNearbyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F6F6F6',
    ...shadowStyle
  },
  imageNearbyItem: {
    //child
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#F6F6F6'
  },
  nearbyItemDetail: {
    position: 'absolute',
    top: 24,
    right: 24,
    flexDirection: 'row',
    // marginHorizontal: PADDING,
    // marginBottom: PADDING,
    zIndex: 2
  },
  popularList: {
    marginTop: DEFAULT_PADDING
    // marginBottom: PADDING
  },
  imagePopularItem: {
    width: 135,
    height: 186,
    borderRadius: 12,
    backgroundColor: '#F6F6F6'
  },
  popularItemDetail: {
    position: 'absolute',
    marginHorizontal: 12,
    bottom: 8,
    flexDirection: 'row'
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
    fontSize: 12,
    color: palette.secondaryTypographyColor,
    fontFamily: 'Montserrat-Medium'
  },
  // title: {
  //   fontSize: 26,
  //   color: palette.backgroundColorWhite,
  //   textShadowColor: '#474747',
  //   textShadowOffset: { width: 0.5, height: 3 },
  //   textShadowRadius: 5,
  //   fontFamily: 'Montserrat-SemiBold'
  // },
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
  },
  secondaryTitleNoShadow: {
    fontSize: 14,
    color: '#3A3A3A',
    opacity: 0.7,
    fontFamily: 'Montserrat-SemiBold'
  },
  overlayHeart: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    ...shadowStyle
  },
  fixedImageContentBox: {
    position: 'absolute',
    bottom: -PADDING,
    width: IMAGE_WIDTH - PADDING * 6,
    // height: 77,
    backgroundColor: palette.backgroundColorWhite,
    paddingVertical: 12,
    paddingHorizontal: 18,
    elevation: 4,
    borderRadius: 12,
    alignSelf: 'center',
    ...shadowStyle
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: '#DCE0E9',
    borderColor: 'transparent'
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: palette.primaryColorLight
  }
})
