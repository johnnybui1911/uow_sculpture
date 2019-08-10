import { StyleSheet, Dimensions } from 'react-native'
import palette from '../../assets/palette'

const { width, height } = Dimensions.get('window')

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
  overlayImage: {
    position: 'absolute',
    paddingHorizontal: 24,
    paddingVertical: 7,
    bottom: 0,
    height: 60,
    width: '100%',
    // borderBottomRightRadius: 12,
    // borderBottomLeftRadius: 12,
    justifyContent: 'flex-end'
  },
  headerImage: {
    // borderBottomRightRadius: 12,
    // borderBottomLeftRadius: 12,
    // backgroundColor: palette.backgroundColorWhite,
    // ...shadowStyle,
    // elevation: 10
  },
  imageItem: {
    width: width,
    height: height * 0.4,
    zIndex: 2
    // borderBottomRightRadius: 12
    // borderBottomLeftRadius: 12
  },
  detailContainer: {
    zIndex: 1,
    flex: 3,
    flexDirection: 'column-reverse'
  },
  card: {
    flex: 1,
    padding: 24,
    backgroundColor: palette.backgroundColorWhite,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    marginTop: -10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.1
  },
  contentBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  alt_description: {
    fontSize: 14,
    color: palette.primaryColorLight,
    fontFamily: 'Montserrat-Medium'
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
  visitorsText: {
    opacity: 0.75,
    fontSize: 12,
    color: palette.backgroundColorWhite,
    fontFamily: 'Montserrat-SemiBold'
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
  }
})
