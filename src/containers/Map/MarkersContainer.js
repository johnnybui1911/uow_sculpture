import React from 'react'
import { connect } from 'react-redux'
import MarkerView from './MarkerView'

const MarkersContainer = ({ markers, _onMarkerPressed }) => {
  if (markers.length > 0) {
    const filterMarkers = markers.filter(marker => marker.coordinate.latitude)
    return (
      <React.Fragment>
        {filterMarkers.map(marker => (
          <MarkerView
            key={marker.id}
            marker={marker}
            _onMarkerPressed={_onMarkerPressed}
          />
        ))}
      </React.Fragment>
    )
  }
  return null
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers
})

export default connect(mapStateToProps)(MarkersContainer)
