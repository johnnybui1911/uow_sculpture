import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import images from '../../assets/images'
import styles from './styles'

class MarkerView extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { marker, pressed, selected } = this.props
    if (selected && !pressed) {
      return (
        <Marker
          zIndex={1}
          coordinate={marker.coordinate}
          onPress={() => this.props._onMarkerPressed(marker.id, marker.name)}
        >
          <View style={styles.unselected_marker} />
        </Marker>
      )
    }
    return (
      <Marker
        zIndex={1}
        coordinate={marker.coordinate}
        onPress={() => this.props._onMarkerPressed(marker.id, marker.name)}
        image={pressed ? images.chosen_marker : images.marker}
      />
    )
  }
}

export default MarkerView
