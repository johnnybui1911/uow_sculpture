import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Platform,
  StatusBar
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { icons } from '../../assets/icons'
import palette from '../../assets/palette'
import {
  STATUS_BAR_HEIGHT,
  HEADER_BAR_MARGIN_TOP
} from '../../assets/dimension'
import CustomStatusBar from '../CustomStatusBar'

export const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[{ height: STATUS_BAR_HEIGHT, backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

export default withNavigation(
  ({
    navigation,
    headerName,
    rightButton,
    leftButton,
    handleRightButton,
    leftButtonDisable = false
  }) => {
    return (
      <React.Fragment>
        <CustomStatusBar />
        <View
          style={{
            paddingTop: HEADER_BAR_MARGIN_TOP + 6,
            paddingHorizontal: 24,
            paddingBottom: 12,
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: palette.backgroundTabColor,
            // marginBottom: 12,
            elevation: 2
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              if (!leftButtonDisable) {
                navigation.goBack()
              }
            }}
          >
            <View
              style={{
                width: 50,
                justifyContent: 'center',
                paddingBottom: 4 + 1,
                opacity: leftButtonDisable ? 0.5 : 1
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
      </React.Fragment>
    )
  }
)
