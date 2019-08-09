import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'

export default StyleSheet.create({
  headerContainer: {
    marginTop: STATUS_BAR_HEIGHT * 2,
    height: 53,
    marginHorizontal: 24,
    marginBottom: 18
  },
  headerTitle: {
    fontSize: 40,
    color: palette.primaryTypographyColor,
    fontFamily: 'Montserrat-Medium'
  }
})
