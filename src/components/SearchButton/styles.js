import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'

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
  elevation: 5
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
    marginVertical: 10,
    marginHorizontal: 24,
    height: 51,
    backgroundColor: palette.backgroundColorWhite,
    elevation: 2,
    borderRadius: 12
  },
  searchBoxFlat: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 24,
    height: 51,
    backgroundColor: palette.backgroundColorWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D6'
  }
})
