import { Platform, Dimensions, StatusBar } from 'react-native'

export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
export const SCREEN_HEIGHT =
  Platform.OS === 'android'
    ? Dimensions.get('screen').height // - STATUS_BAR_HEIGHT
    : Dimensions.get('screen').height
export const SCREEN_WIDTH = Dimensions.get('screen').width

export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT

// 'window'
