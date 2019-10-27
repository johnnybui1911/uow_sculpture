/**
 * Description: Footer Content Component
 * Author: Nam Bui
 **/

import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import styles from '../styles'
import { SwipeButton } from '../../../components'
import { MapContext } from '../context/MapContext'
import formatDistance from '../../../library/formatDistance'
import LikeComment from '../../../components/LikeComment/LikeComment'
import palette from '../../../assets/palette'

const MiniView = ({ selectedMarker, distanceMatrix, _navigateToDetail }) => {
  const { setShowDirection, direction_state } = React.useContext(MapContext)

  if (selectedMarker) {
    return (
      <View
        style={{
          height: 220,
          backgroundColor: '#FFF',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
        }}
      >
        <View style={[styles.description_container, { paddingTop: 12 }]}>
          <View
            style={{
              height: 130
            }}
          >
            <SwipeButton />
            {direction_state.isDistanceLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ActivityIndicator
                  size="small"
                  color={palette.primaryColorLight}
                />
              </View>
            ) : (
              <React.Fragment>
                <Text style={[styles.distance]}>
                  {formatDistance(direction_state.distance)}
                </Text>
                <View
                  style={{
                    paddingBottom: 5,
                    marginTop: Platform.OS === 'ios' ? 0 : -5
                  }}
                >
                  <Text style={styles.title} numberOfLines={1}>
                    {selectedMarker.name}
                  </Text>
                </View>
                <View style={{}}>
                  <Text numberOfLines={2} style={[styles.description]}>
                    {selectedMarker.description.location}
                  </Text>
                </View>
                {/* <Divider styles={{ marginVertical: 12 }} /> */}
                <LikeComment
                  markerId={selectedMarker.id}
                  style={{ marginBottom: -12, paddingTop: 12 }}
                />
              </React.Fragment>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                setShowDirection(true)
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.titleButton]}>GO THERE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return null
}

const mapStateToProps = getState => ({
  selectedMarker: getState.markerReducer.selectedMarker,
  distanceMatrix: getState.distanceReducer.distanceMatrix
})

export default connect(mapStateToProps)(MiniView)
