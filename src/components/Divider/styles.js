import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'

export default StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.dividerColorNew,
    width: '100%',
    marginVertical: 12
  },
  dividerLight: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.backgroundTabColor,
    width: '100%',
    marginVertical: 20
  }
})
