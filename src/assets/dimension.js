import { Platform, Dimensions, StatusBar } from 'react-native'
import Constants from 'expo-constants'

// console.log(Dimensions.get('screen').height)
// console.log(Dimensions.get('window').height)
export const DEFAULT_PADDING = 12
const checkHeight =
  Dimensions.get('window').height < Dimensions.get('screen').height

export const FULL_SCREEN_HEIGHT = Dimensions.get('screen').height

export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios'
    ? 20
    : Constants.statusBarHeight === 0
    ? Constants.statusBarHeight
    : 24
export const SCREEN_HEIGHT =
  Platform.OS === 'android'
    ? FULL_SCREEN_HEIGHT
    : // ? checkHeight
      //   ? FULL_SCREEN_HEIGHT
      //   : Dimensions.get('window').height // - STATUS_BAR_HEIGHT
      FULL_SCREEN_HEIGHT - 20
export const SCREEN_WIDTH = Dimensions.get('window').width
export const HEADER_AUTH = 209
export const TOP_TAB_BAR_HEIGHT = 44
export const BOTTOM_TAB_BAR_HEIGHT = 50

export const MIN_TABVIEW_HEIGHT =
  Platform.OS === 'ios'
    ? SCREEN_HEIGHT -
      (TOP_TAB_BAR_HEIGHT + BOTTOM_TAB_BAR_HEIGHT - DEFAULT_PADDING * 2)
    : SCREEN_HEIGHT -
      (TOP_TAB_BAR_HEIGHT + BOTTOM_TAB_BAR_HEIGHT + STATUS_BAR_HEIGHT)

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

export const PROFILE_HEADER_HEIGHT = 400
export const PROFILE_TAB_BAR_HEIGHT = 44
