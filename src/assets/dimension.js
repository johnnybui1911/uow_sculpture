import { Platform, Dimensions, StatusBar } from 'react-native'

export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
export const SCREEN_HEIGHT =
  Platform.OS === 'android'
    ? Dimensions.get('screen').height // - STATUS_BAR_HEIGHT
    : Dimensions.get('screen').height
export const SCREEN_WIDTH = Dimensions.get('screen').width
export const HEADER_AUTH = 209
export const TOP_TAB_BAR_HEIGHT = 44
export const BOTTOM_TAB_BAR_HEIGHT = 50
export const MIN_TABVIEW_HEIGHT =
  SCREEN_HEIGHT - (TOP_TAB_BAR_HEIGHT + BOTTOM_TAB_BAR_HEIGHT)
export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT

// 'window'
