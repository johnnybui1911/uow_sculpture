import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import MiniView from './MiniView'
import ButtonMyLocation from '../../components/ButtonMyLocation/ButtonMyLocation'
import styles from './styles'

const Footer = ({
  selectedMarker,
  centered,
  _navigateToDetail,
  _centerUserLocation
}) => {
  if (selectedMarker) {
    return (
      <MiniView marker={selectedMarker} _navigateToDetail={_navigateToDetail}>
        <ButtonMyLocation
          centered={centered}
          _centerUserLocation={_centerUserLocation}
        />
      </MiniView>
    )
  }

  return (
    <View
      style={[
        styles.mini_view_container,
        { alignItems: 'flex-end', paddingHorizontal: 24, paddingBottom: 12 }
      ]}
    >
      <ButtonMyLocation
        centered={centered}
        _centerUserLocation={_centerUserLocation}
      />
    </View>
  )
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker
})

export default connect(mapStateToProps)(Footer)
