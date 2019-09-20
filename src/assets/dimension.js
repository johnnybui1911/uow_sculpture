import { Platform, Dimensions, StatusBar } from 'react-native'
import Constants from 'expo-constants'

// export const STATUS_BAR_HEIGHT =
//   Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
export const SCREEN_HEIGHT =
  Platform.OS === 'android'
    ? Dimensions.get('screen').height // - STATUS_BAR_HEIGHT
    : Dimensions.get('screen').height
export const SCREEN_WIDTH = Dimensions.get('screen').width
export const HEADER_AUTH = 209
export const TOP_TAB_BAR_HEIGHT = 44
export const BOTTOM_TAB_BAR_HEIGHT = 50
export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios'
    ? 20
    : Constants.statusBarHeight === 0
    ? Constants.statusBarHeight
    : 24

export const MIN_TABVIEW_HEIGHT =
  SCREEN_HEIGHT -
  (TOP_TAB_BAR_HEIGHT + BOTTOM_TAB_BAR_HEIGHT + STATUS_BAR_HEIGHT) // fix status bar, plus status bar height in tab view height an scroll height
export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT
// 'window'
export const BUTTON_HEIGHT = 44
export const TEXT_INPUT_HEIGHT = 48

export const EXPANDED_HEIGHT_STEPBOX = SCREEN_HEIGHT - STATUS_BAR_HEIGHT
export const COLLAPSED_HEIGHT_STEPBOX = 166 - 25
