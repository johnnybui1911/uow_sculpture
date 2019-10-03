import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'
import { HEADER_BAR_MARGIN_TOP } from '../../assets/dimension'

export default StyleSheet.create({
  headerContainer: {
    marginTop: HEADER_BAR_MARGIN_TOP,
    // height: 48,
    marginHorizontal: 24,
    marginBottom: 6
  },
  headerTitle: {
    fontSize: 40,
    color: palette.primaryTypographyColor,
    fontFamily: 'Montserrat-Medium'
  }
})
