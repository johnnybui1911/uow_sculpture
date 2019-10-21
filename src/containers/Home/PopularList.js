/**
 * Description: Popular Sculpture List Component
 * Author: Nam Bui
 **/

import React from 'react'
import { FlatList, View, Text, Image } from 'react-native'
import images from '../../assets/images'
import styles from './styles'

const PopularList = props => {
  const { data, _renderItem } = props
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item, index) => item.id.toString()}
      renderItem={_renderItem}
      style={styles.flatList}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default PopularList
