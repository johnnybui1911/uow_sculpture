import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import styles from '../styles'
import images from '../../../assets/images'
import { icons } from '../../../assets/icons'
import { Divider, SwipeButton } from '../../../components'
import { SCREEN_WIDTH } from '../../../assets/dimension'
import { MapContext } from '../context/MapContext'
import formatDistance from '../../../library/formatDistance'
import LikeComment from '../../../components/LikeComment/LikeComment'

const MiniView = ({ selectedMarker, distanceMatrix, _navigateToDetail }) => {
  const { setShowDirection } = React.useContext(MapContext)

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
        {/* <View
          style={[
            {
              height: 96,
              alignItems: 'flex-end',
              paddingHorizontal: 24,
              paddingBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
          ]}
        >
          <TouchableWithoutFeedback
            onPress={() => _navigateToDetail(fakeMarker)}
          >
            <View style={styles.mini_image_container}>
              <Image
                source={{ uri: fakeMarker.photoURL }}
                style={styles.image}
              />
            </View>
          </TouchableWithoutFeedback>
          {children}
        </View> */}
        <View style={[styles.description_container, { paddingTop: 12 }]}>
          <View
            style={{
              height: 130
            }}
          >
            <SwipeButton />
            <Text style={styles.distance}>
              {distanceMatrix[selectedMarker.id]
                ? formatDistance(distanceMatrix[selectedMarker.id].distance)
                : ''}
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {selectedMarker.name}
            </Text>
            <View style={{}}>
              <Text numberOfLines={2} style={styles.description}>
                {selectedMarker.description.location}
              </Text>
              {/* {icons.one_dot}
              <Text style={styles.description}>{selectedMarker.duration} min</Text> */}
            </View>
            <Divider styles={{ marginVertical: 12 }} />
            <LikeComment markerId={selectedMarker.id} />
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