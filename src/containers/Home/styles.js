import { StyleSheet, Dimensions } from 'react-native'
import palette from '../../assets/palette'

const shadowStyle = {
  elevation: 8,
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
const IMAGE_WIDTH = WIDTH - PADDING * 2
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.15

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorGrey
  },
  nearbyItemStyle: {
    // root container
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    padding: PADDING,
    margin: PADDING,
    backgroundColor: palette.backgroundColorGrey,
    borderRadius: 12
  },
  imageNearbyContainer: {
    // parent container
    borderRadius: 12,
    ...shadowStyle
  },
  imageNearbyItem: {
    //child
    width: '100%',
    height: '100%',
    borderRadius: 12
  },
  nearbyItemDetail: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    marginHorizontal: PADDING,
    marginBottom: PADDING,
    zIndex: 2
  },
  popularList: {
    marginTop: 16,
    marginBottom: PADDING
  },
  imagePopularItem: {
    width: 135,
    height: 186,
    borderRadius: 12
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
  }
})
