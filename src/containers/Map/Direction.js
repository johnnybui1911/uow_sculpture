import React from 'react'
import { connect } from 'react-redux'
import MapViewDirections from '../../library/react-native-maps-directions/MapViewDirections'
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
