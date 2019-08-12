import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { icons } from '../../assets/icons'

export default ({ _goBack }) => (
  <TouchableWithoutFeedback onPress={_goBack}>
    <View
      style={{
        position: 'absolute',
        top: 56 - 24,
        padding: 24,
        borderRadius: 50
      }}
    >
      {icons.back}
    </View>
  </TouchableWithoutFeedback>
)
