import { Platform, Dimensions, StatusBar } from 'react-native'
import Constants from 'expo-constants'

console.log(Dimensions.get('screen').height)
console.log(Dimensions.get('window').height)
export const DEFAULT_PADDING = 12
// const checkHeight =
//   Dimensions.get('window').height < Dimensions.get('screen').height
const ANDROID_STATUS_BAR =
  StatusBar.currentHeight === 0 ? 24 : StatusBar.currentHeight

export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : ANDROID_STATUS_BAR

export const FULL_SCREEN_HEIGHT = Math.round(Dimensions.get('screen').height)
export const FULL_WINDOW_HEIGHT = Math.round(Dimensions.get('window').height)

export const HAS_ANDROID_NAVIGATION_BAR =
  Platform.OS === 'android' && FULL_SCREEN_HEIGHT - FULL_WINDOW_HEIGHT >= 48
// &&
// ANDROID_STATUS_BAR < 48
//   ||
// (Platform.OS === 'android' &&
//   ANDROID_STATUS_BAR >= 48 &&
//   FULL_SCREEN_HEIGHT - FULL_WINDOW_HEIGHT >= 48 * 2)

export const NAVIGATION_BAR_HEIGHT = HAS_ANDROID_NAVIGATION_BAR ? 48 : 0

export const DEVICE_HAS_NOTCH =
  Platform.OS === 'android' && STATUS_BAR_HEIGHT > 24

export const SCREEN_HEIGHT =
  Platform.OS === 'android'
    ? FULL_SCREEN_HEIGHT
    : // ? checkHeight
      //   ? FULL_SCREEN_HEIGHT
      //   : Dimensions.get('window').height // - STATUS_BAR_HEIGHT
      FULL_SCREEN_HEIGHT - 20

export const SCREEN_WIDTH = Dimensions.get('window').width
export const HEADER_AUTH = 209
export const BOTTOM_TAB_BAR_HEIGHT = 50

export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT
// 'window'
export const BUTTON_HEIGHT = 44
export const TEXT_INPUT_HEIGHT = 48

export const EXPANDED_HEIGHT_STEPBOX =
  Platform.OS === 'ios' ? SCREEN_HEIGHT : SCREEN_HEIGHT - STATUS_BAR_HEIGHT
export const COLLAPSED_HEIGHT_STEPBOX = 166 - 25
export const MARGIN_BOTTOM_STEPBOX = COLLAPSED_HEIGHT_STEPBOX
export const HEADER_BAR_MARGIN_TOP =
  Platform.OS === 'ios' ? 6 : STATUS_BAR_HEIGHT + 6

export const MINI_HEADER_HEIGHT = 60
export const PROFILE_HEADER_HEIGHT = 400
export const PROFILE_TAB_BAR_HEIGHT = 44
export const MIN_TABVIEW_HEIGHT =
  Platform.OS === 'ios'
    ? SCREEN_HEIGHT -
      (PROFILE_TAB_BAR_HEIGHT + BOTTOM_TAB_BAR_HEIGHT - DEFAULT_PADDING * 2)
    : SCREEN_HEIGHT -
      (PROFILE_TAB_BAR_HEIGHT + BOTTOM_TAB_BAR_HEIGHT + STATUS_BAR_HEIGHT)

export const SCROLLABLE_HEIGHT =
  Platform.OS === 'ios'
    ? PROFILE_HEADER_HEIGHT - MINI_HEADER_HEIGHT
    : PROFILE_HEADER_HEIGHT - MINI_HEADER_HEIGHT - STATUS_BAR_HEIGHT // FIX LATER
