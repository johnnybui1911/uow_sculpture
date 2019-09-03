import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'

export default StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: palette.secondaryTypographyStrongColor,
    width: '100%',
    marginVertical: 20
  },
  dividerLight: {
    height: 1,
    backgroundColor: palette.backgroundTabColor,
    width: '100%',
    marginVertical: 20
  }
})
