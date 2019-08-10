import React, { PureComponent } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

export default class DoubleTap extends PureComponent {
  static defaultProps = {
    delay: 300,
    onDoubleTap: () => null,
    onSingleTap: () => null
  }

  lastTap: null

  handleDoubleTap = () => {
    const now = Date.now()
    if (this.lastTap && now - this.lastTap < this.props.delay) {
      this.props.onDoubleTap()
    } else {
      this.lastTap = now
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
        {this.props.children}
      </TouchableWithoutFeedback>
    )
  }
}
