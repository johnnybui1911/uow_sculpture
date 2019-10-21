/**
 * Description: Search Item Component
 * Author: Nam Bui
 **/

import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { icons } from '../../assets/icons'
import styles from './styles'
import palette from '../../assets/palette'
import { insertSearchItem, selectMarker } from '../../redux/actions'
import formatDistance from '../../library/formatDistance'

const SearchItem = ({
  item,
  index,
  searchText,
  insertSearchItem,
  distanceMatrix,
  navigation,
  _onMarkerPressed,
  markerMatrix,
  centerToMarker
}) => {
  // const animatedName = item.name.slice(0, searchText.length)
  // const originalName = item.name.slice(searchText.length, item.name.length)

  const onItemClick = () => {
    let selectedItem = item
    insertSearchItem(selectedItem)
    if (_onMarkerPressed) {
      if (item.recent) {
        // Check for recent search item
        selectedItem = markerMatrix[item.id]
      }
      if (selectedItem.coordinate.latitude) {
        _onMarkerPressed(selectedItem, centerToMarker)
        navigation.navigate('Map', { showTab: false })
      } else {
        navigation.navigate('Detail', { id: item.id })
      }
    } else {
      navigation.navigate('Detail', { id: item.id })
    }
  }

  if (markerMatrix[item.id]) {
    const newItem = { ...markerMatrix[item.id], recent: item.recent }
    return (
      <TouchableHighlight
        underlayColor="#FAFAFA"
        onPress={() => onItemClick()}
        style={{ paddingVertical: 5, flex: 1, paddingTop: index === 0 ? 0 : 5 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
            // paddingVertical: 5
            // paddingHorizontal: 18
          }}
        >
          <View
            style={{
              alignItems: 'center',
              paddingTop: 8,
              width: 50
            }}
          >
            {newItem.recent ? icons.clock : icons.marker_fill_w}
            <Text style={styles.distance}>
              {!newItem.recent && distanceMatrix && distanceMatrix[newItem.id]
                ? formatDistance(distanceMatrix[newItem.id].distance)
                : ''}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 12,
              paddingBottom: newItem.recent ? 6 : 0
            }}
          >
            <Text numberOfLines={1} style={[styles.title]}>
              {/* <Text
                style={[
                  styles.title,
                  { color: palette.secondaryTypographyColor }
                ]}
              >
                {animatedName}
              </Text> */}
              {newItem.name}
            </Text>
            <Text style={[styles.description]}>{newItem.features.maker}</Text>
          </View>
          <View
            style={{
              width: 50,
              alignItems: 'flex-end',
              paddingRight: 12
            }}
          >
            {icons.noun_arrow}
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  return null
}

const mapStateToProps = getState => ({
  distanceMatrix: getState.distanceReducer.distanceMatrix,
  markerMatrix: getState.markerReducer.markerMatrix
})

const mapDispatchToProps = {
  insertSearchItem,
  selectMarker
}

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchItem)
)
