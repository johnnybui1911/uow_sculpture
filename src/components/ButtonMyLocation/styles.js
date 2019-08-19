import { StyleSheet } from 'react-native'
import palette from '../../assets/palette'

const shadowStyle = {
  elevation: 12,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 0.1
}

export default StyleSheet.create({
  button_my_location: {
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: palette.backgroundColorWhite,
    zIndex: 20,
    ...shadowStyle
  }
})
