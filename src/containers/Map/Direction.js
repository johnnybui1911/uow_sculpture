import React from 'react'
import MapViewDirections from 'react-native-maps-directions'
import { connect } from 'react-redux'
import { GOOGLE_MAPS_APIKEY } from '../../library/maps'

const Direction = ({
  _fitToCoordinate,
  userCoordinate,
  selectedMarker,
  showDirection,
  _getSteps,
  _handleDirectionState
}) => {
  if (userCoordinate && selectedMarker && showDirection) {
    const userLocation = userCoordinate.__getValue()
    const origin = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude
    }
    return (
      <MapViewDirections
        origin={origin}
        destination={selectedMarker.coordinate}
        apikey={GOOGLE_MAPS_APIKEY}
        mode="WALKING"
        strokeWidth={6}
        strokeColor="#0047BB"
        style={{ zIndex: 9 }}
        onReady={result => {
          // const distance =
          //   result.distance > 1000
          //     ? (result.distance / 1000).toFixed(1) + ' km'
          //     : result.distance + ' m'
          _fitToCoordinate(result.coordinates)
          _getSteps(result.steps)
        }}
      />
    )
  } else {
    return null
  }
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(Direction)
