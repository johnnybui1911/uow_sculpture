import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { icons } from '../../assets/icons'

export default ({ _goBack, style }) => {
  const BackButton = icons.back
  return (
    <TouchableWithoutFeedback onPress={_goBack}>
      <View
        style={{
          position: 'absolute',
          top: 56 - 24,
          padding: 24,
          borderRadius: 50,
          zIndex: 10
        }}
      >
        <BackButton style={{ ...style }} />
      </View>
    </TouchableWithoutFeedback>
  )
}
