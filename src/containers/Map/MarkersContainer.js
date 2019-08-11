import React from 'react'
import { connect } from 'react-redux'
import MarkerView from './MarkerView'

const MarkersContainer = ({ markers, _onMarkerPressed }) => {
  if (markers.length > 0) {
    return (
      <React.Fragment>
        {markers.map(marker => (
          <MarkerView
            key={marker.id}
            marker={marker}
            _onMarkerPressed={_onMarkerPressed}
          />
        ))}
      </React.Fragment>
    )
  }
}

const mapStateToProps = getState => ({
  markers: getState.markerReducer.markers
})

export default connect(mapStateToProps)(MarkersContainer)
