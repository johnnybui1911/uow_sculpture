import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import images from '../../assets/images'
import styles from './styles'
import { icons } from '../../assets/icons'

class MarkerView extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { marker, selectedMarker } = this.props
    if (selectedMarker) {
      return (
        <Marker
          style={{ zIndex: 1 }}
          coordinate={marker.coordinate}
          onPress={() => this.props._onMarkerPressed(marker.id, marker.name)}
          // image={marker.id === selectedMarker.id ? images.chosen_marker : null}
        >
          {marker.id !== selectedMarker.id ? (
            <View style={styles.unselected_marker} />
          ) : (
            icons.chosen_marker
          )}
        </Marker>
      )
    }
    return (
      <Marker
        zIndex={1}
        coordinate={marker.coordinate}
        onPress={() => this.props._onMarkerPressed(marker.id, marker.name)}
      >
        {icons.marker}
      </Marker>
    )
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(MarkerView)
