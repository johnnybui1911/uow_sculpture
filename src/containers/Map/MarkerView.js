import React from 'react'
import { Text, View } from 'react-native'
import { Marker } from 'react-native-maps'
import { icons } from '../../assets/icons'
import styles from './styles'
import images from '../../assets/images'

export default class MarkerView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pressed: false
    }
  }

  _onMarkerPress = e => {
    const {
      coordinate: { latitude, longitude }
    } = e.nativeEvent

    this.setState(
      prevState => ({ pressed: !prevState.pressed }),
      () => this.props._handleOnPressedMarker(latitude, longitude)
    )
  }

  _renderChosenIcon = () => {
    const { pressed } = this.state
    const { selected_marker } = this.props
    if (selected_marker && pressed) {
      return icons.chosen_marker
    }
    return icons.marker
  }

  render() {
    const { pressed } = this.state
    const { marker, selected_marker } = this.props
    return (
      <Marker
        zIndex={1}
        coordinate={marker.coordinate}
        title={marker.name}
        onPress={e => this._onMarkerPress(e)}
        image={
          selected_marker && pressed ? images.chosen_marker : images.marker
        }
      />
    )
  }
}
