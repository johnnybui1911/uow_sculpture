/**
 * Description: Nearby Sculpture List Component
 * Author: Nam Bui
 **/

import React from 'react'
import { FlatList, View } from 'react-native'
import styles from './styles'

const NearbyList = props => {
  const { data, _renderItem } = props
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={_renderItem}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="center"
    />
  )
}

export default NearbyList
