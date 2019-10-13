import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet
} from 'react-native'
import { CustomIcon } from '../../assets/icons'
import palette from '../../assets/palette'
import { SCREEN_WIDTH, BOTTOM_TAB_BAR_HEIGHT } from '../../assets/dimension'

const iconTab = ['home', 'map', 'list', 'personal']

class CustomBottomTab extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: true
    }
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow
    )
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide
    )
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    })
  }

  render() {
    const { navigation } = this.props
    const { routes } = navigation.state
    const { isVisible } = this.state
    return isVisible ? (
      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: palette.onPressColor,
          height: BOTTOM_TAB_BAR_HEIGHT,
          width: SCREEN_WIDTH,
          flexDirection: 'row'
        }}
      >
        {routes &&
          routes.map((route, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.props.jumpTo(route.routeName)}
                style={{}}
              >
                <View
                  style={{
                    width: '25%',
                    minHeight: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      navigation.state.index === index
                        ? palette.backgroundTabColor
                        : palette.backgroundColorWhite,
                    borderBottomWidth: navigation.state.index === index ? 3 : 0,
                    borderBottomColor: palette.primaryColorLight
                  }}
                >
                  {navigation.state.index === index && (
                    <CustomIcon
                      name={iconTab[index]}
                      size={index === 2 || index === 3 ? 16 : 24}
                      color={palette.primaryColorLight}
                    />
                  )}
                  {navigation.state.index !== index && (
                    <CustomIcon
                      name={iconTab[index]}
                      size={index === 2 || index === 3 ? 16 : 24}
                      color={palette.secondaryTypographyColor}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            )
          })}
      </View>
    ) : null
  }
}

export default CustomBottomTab
