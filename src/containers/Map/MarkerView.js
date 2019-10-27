/**
 * Description: Custom Marker on Map Screen
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Platform } from 'react-native'
import { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import styles from './styles'
import { icons } from '../../assets/icons'

class MarkerView extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    const nextSelectedMarker = nextProps.selectedMarker || {}
    const selectedMarker = this.props.selectedMarker || {}
    const { marker } = this.props

    return (
      marker.id === nextSelectedMarker.id ||
      (selectedMarker.id === marker.id &&
        selectedMarker.id !== nextSelectedMarker.id)
    )
  }

  // componentDidUpdate = () => {
  //   console.log('updateMarker')
  // }

  renderMarker = () => {
    const { marker, selectedMarker } = this.props
    if (selectedMarker && marker.id === selectedMarker.id) {
      return (
        <View
          style={{
            paddingBottom: 5
          }}
        >
          {icons.marker}
        </View>
      )
    } else {
      return (
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
      )
    }
  }

  render() {
    const { marker, selectedMarker } = this.props
    const checkOnPressMarker =
      (selectedMarker && marker.id === selectedMarker.id) ||
      Platform.OS === 'ios'
    return (
      <Marker
        identifier={marker.id}
        zIndex={2}
        tracksViewChanges={checkOnPressMarker ? true : false}
        coordinate={marker.coordinate}
        onPress={() => this.props._onMarkerPressed(marker, true)}
      >
        {this.renderMarker()}
      </Marker>
    )
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(MarkerView)
