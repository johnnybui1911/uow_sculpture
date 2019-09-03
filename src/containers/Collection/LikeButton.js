import React from 'react'
import { View, TouchableWithoutFeedback, Animated, Text } from 'react-native'
import { icons } from '../../assets/icons'
import styles from './styles'

export default class LikeButton extends React.PureComponent {
  static defaultProps = {
    likes: 100
  }

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
    const { likes } = this.props
    return (
      <View
        style={{
          flexDirection: 'row',
          marginRight: 20,
          alignItems: 'center',
          marginLeft: -5,
          width: 60
        }}
      >
        <TouchableWithoutFeedback onPress={this.onPress}>
          <Animated.View style={[animatedStyle, { padding: 5 }]}>
            {this.state.pressed ? icons.like_fill : icons.like_outline}
          </Animated.View>
        </TouchableWithoutFeedback>
        <Text style={styles.numberStyle}>
          {this.state.pressed ? likes + 1 : likes}
        </Text>
      </View>
    )
  }
}
