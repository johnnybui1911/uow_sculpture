import React from 'react'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import { icons } from '../../assets/icons'

export default class LikeButton extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      pressed: false
    }
    this.animatedValue = new Animated.Value(1)
  }

  onPress = () => {
    this.setState(
      prevState => ({
        pressed: !prevState.pressed
      }),
      () => {
        const { pressed } = this.state
        if (pressed) {
          this.animatedValue.setValue(1.4)
          Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 2
          }).start()
        } else {
          this.animatedValue.setValue(1)
        }
      }
    )
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    }

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animated.View style={[animatedStyle, { padding: 5 }]}>
          {this.state.pressed ? icons.like_fill : icons.like_outline}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
