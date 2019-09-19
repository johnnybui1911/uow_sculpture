import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { TEXT_INPUT_HEIGHT } from '../../assets/dimension'

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

const cardItem = {
  justifyContent: 'center',
  width: '100%',
  marginVertical: 6,
  paddingHorizontal: 2
}

const cardDes = {
  paddingVertical: 12,
  backgroundColor: palette.backgroundColorWhite,
  width: '85%',
  height: 144,
  borderRadius: 12,
  paddingRight: 10,
  ...shadowStyle
}

const imageContainer = {
  position: 'absolute',
  backgroundColor: palette.backgroundColorWhite,
  borderRadius: 12,
  ...shadowStyle,
  elevation: 3
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
    borderRadius: 12,
    backgroundColor: '#F6F6F6'
  },
  imageContainer
})
