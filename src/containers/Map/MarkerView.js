import React from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import styles from './styles'
import { icons } from '../../assets/icons'

class MarkerView extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  _renderMarkerImage = () => {
    const { marker, selectedMarker } = this.props
    if (selectedMarker) {
      if (marker.id !== selectedMarker.id) {
        return <View style={styles.unselected_marker} />
      }
      return icons.chosen_marker
    } else {
      return icons.marker
    }
  }

  render() {
    const { marker, selectedMarker } = this.props
    if (selectedMarker && marker.id === selectedMarker.id) {
      return (
        <Marker
          zIndex={1}
          // tracksViewChanges={false}
          coordinate={marker.coordinate}
          onPress={() => this.props._onMarkerPressed(marker)}
        >
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center'
              paddingBottom: 5
            }}
          >
            {/* <View style={[styles.oval_large_style, { opacity: 1 }]} />
            <View style={[styles.oval_small_style, { opacity: 1 }]} /> */}
            {icons.marker}
          </View>
        </Marker>
      )
    } else {
      return (
        <Marker
          zIndex={1}
          tracksViewChanges={false}
          coordinate={marker.coordinate}
          onPress={() => this.props._onMarkerPressed(marker)}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: 'rgba(167,164,164,0.3)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={styles.unselected_marker} />
          </View>
        </Marker>
      )
    }
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(MarkerView)
