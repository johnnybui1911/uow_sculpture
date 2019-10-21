/**
 * Description: Custom Back Button
 * Author: Nam Bui
 **/

import React from 'react'
import { TouchableWithoutFeedback, View, Platform } from 'react-native'
import { icons } from '../../assets/icons'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'

export default ({ _goBack, style, disable = false, opacity = 1 }) => {
  const BackButton = icons.back
  return (
    <TouchableWithoutFeedback onPress={_goBack} disabled={disable}>
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 8 : STATUS_BAR_HEIGHT + 8,
          padding: 24,
          // borderRadius: 50,
          zIndex: 10,
          opacity
        }}
      >
        <BackButton style={{ ...style }} />
      </View>
    </TouchableWithoutFeedback>
  )
}
