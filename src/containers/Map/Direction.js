import React from 'react'
import MapViewDirections from 'react-native-maps-directions'
import { connect } from 'react-redux'
import haversine from 'haversine-distance'
import { GOOGLE_MAPS_APIKEY } from '../../library/maps'

const Direction = ({
  userCoordinate,
  selectedMarker,
  showDirection,
  _getSteps
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
        strokeWidth={4}
        strokeColor="#0047BB"
        style={{ zIndex: 9 }}
        onStart={params => {
          console.log(
            `Started routing between "${params.origin}" and "${params.destination}"`
          )
        }}
        onReady={result => {
          console.log(`Distance: ${result.distance} km`)
          console.log(`Duration: ${result.duration} min.`)
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
