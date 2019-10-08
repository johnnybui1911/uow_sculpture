import React from 'react'
import { TouchableWithoutFeedback, View, Platform } from 'react-native'
import { icons } from '../../assets/icons'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'

export default ({ _goBack, style }) => {
  const BackButton = icons.back
  return (
    <TouchableWithoutFeedback onPress={_goBack}>
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 8 : STATUS_BAR_HEIGHT + 8,
          padding: 24,
          // borderRadius: 50,
          zIndex: 10
        }}
      >
        <BackButton style={{ ...style }} />
      </View>
    </TouchableWithoutFeedback>
  )
}
