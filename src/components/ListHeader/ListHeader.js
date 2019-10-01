import React from 'react'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'
import { STATUS_BAR_HEIGHT } from '../../assets/dimension'

export default withNavigation(
  ({ navigation, headerName, rightButton, leftButton, handleRightButton }) => {
    return (
      <View
        style={{
          paddingTop: STATUS_BAR_HEIGHT + 12,
          paddingHorizontal: 24,
          paddingBottom: 12,
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: '#FAFAFA',
          // marginBottom: 12,
          elevation: 2
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View
            style={{
              width: 50,
              justifyContent: 'center',
              paddingBottom: 4 + 1
            }}
          >
            {leftButton ? leftButton : icons.back_blue({ size: 18 })}
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flex: 1,
            paddingBottom: 3
            // alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: palette.primaryTypographyColor,
              fontFamily: 'Montserrat-Medium'
            }}
          >
            {headerName}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => handleRightButton()}>
          <View
            style={{
              width: 50,
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}
          >
            {rightButton}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
)
