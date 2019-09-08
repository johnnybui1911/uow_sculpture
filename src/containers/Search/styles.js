import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'

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
  elevation: 5,
  paddingRight: 10
}

const imageContainer = {
  position: 'absolute',
  backgroundColor: palette.backgroundColorWhite,
  borderRadius: 12,
  elevation: 5
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.backgroundColorWhite
  },
  searchBoxContainer: {
    marginTop: STATUS_BAR_HEIGHT,
    zIndex: 1000,
    backgroundColor: palette.backgroundColorWhite
  },
  flatList: {
    width: '100%'
  },
  title: {
    fontSize: 16,
    color: palette.primaryColor,
    fontFamily: 'Montserrat-Medium'
  },
  description: {
    fontSize: 12,
    color: palette.primaryColorLight,
    fontFamily: 'Montserrat-Medium'
  },
  flatListHeader: {
    fontSize: 14,
    color: palette.secondaryTypographyColor,
    fontFamily: 'Montserrat-SemiBold'
  },
  distance: {
    fontSize: 8,
    fontFamily: 'Montserrat-Medium',
    color: palette.primaryColorLight
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
    elevation: 10,
    borderRadius: 12
  }
})
