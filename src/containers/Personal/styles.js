import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import {
  STATUS_BAR_HEIGHT,
  MIN_TABVIEW_HEIGHT,
  BUTTON_HEIGHT
} from '../../assets/dimension'

const shadowStyle = {
  elevation: 3,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 0.1
}

const cardItem = {
  justifyContent: 'center',
  width: '100%',
  marginVertical: 12,
  paddingHorizontal: 2
}

const cardDes = {
  paddingVertical: 12,
  backgroundColor: palette.backgroundColorWhite,
  width: '85%',
  height: 144,
  borderRadius: 12,
  ...shadowStyle
}

const imageContainer = {
  position: 'absolute',
  backgroundColor: palette.backgroundColorWhite,
  borderRadius: 12,
  elevation: 5
}

const box = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 30,
  backgroundColor: palette.secondaryColor,
  borderRadius: 12,
  minWidth: 60
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorWhite
  },
  profileFixedContainer: { height: 400, backgroundColor: palette.primaryColor },
  headerContainer: {
    marginTop: STATUS_BAR_HEIGHT * 2,
    alignItems: 'center',
    height: 53,
    marginHorizontal: 24,
    marginBottom: 18,
    flexDirection: 'row'
  },
  tabViewStyle: {
    flex: 1,
    minHeight: MIN_TABVIEW_HEIGHT,
    backgroundColor: palette.backgroundColorWhite
  },
  headerTitle: {
    fontSize: 40,
    color: palette.backgroundColorWhite,
    fontFamily: 'Montserrat-Medium'
  },
  flatList: {
    flex: 1,
    width: '100%'
  },
  title: {
    fontSize: 20,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold'
  },
  titleButton: {
    fontSize: 12,
    color: palette.backgroundColorWhite,
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
  description_cmt: {
    fontSize: 12,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-Medium'
  },
  alt_description: {
    fontSize: 14,
    color: palette.primaryColorLight,
    fontFamily: 'Montserrat-Medium'
  },
  numberStyle: {
    fontSize: 12,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-SemiBold',
    paddingLeft: 5
  },
  cardItem,
  cardDes,
  cardDesLeft: {
    ...cardDes,
    paddingLeft: 83
  },
  cardDesRight: {
    ...cardDes,
    paddingLeft: 20,
    paddingRight: 83
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12
  },
  imageContainer,
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    height: 44,
    backgroundColor: palette.backgroundColorWhite,
    borderRadius: 12,
    ...shadowStyle
  },
  box,
  button: {
    backgroundColor: palette.backgroundColorWhite,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10,
    height: BUTTON_HEIGHT,
    ...shadowStyle,
    elevation: 2
  },
  accountNameView: {
    backgroundColor: palette.backgroundColorWhite,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10,
    height: 51,
    ...shadowStyle
  },
  card: {
    padding: 24,
    backgroundColor: palette.backgroundColorWhite,
    borderRadius: 12,
    height: 126,
    ...shadowStyle
  },
  contentBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
